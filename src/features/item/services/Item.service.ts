import { Item } from "@/generated/prisma";
import { PrismaItemRepository } from "../infrastructure/repositories/Item.repository.prisma";
import { CreateItemDto } from "../domain/dtos/CreateItem.dto";
import { UpdateItemDto } from "../domain/dtos/UpdateItem.dto";
import { ItemQueryParams } from "../domain/types/ItemQueryParams";
import { safeValidateItemFilters } from "../domain/dtos/NameLikeItem.dto";
import { ImageStorage } from "../application/ports/ImageStorage";
import { BadRequestError, NotFoundError } from "@/utils/errors/CustomError";
export class ItemService {
  constructor(private readonly itemRepository: PrismaItemRepository, private readonly imageStorage: ImageStorage) { }

  // アイテムを全て取得する
  async findAll(filters?: ItemQueryParams): Promise<Item[]> {
    if (filters) {
      // フィルタリング条件のバリデーション
      const validationResult = safeValidateItemFilters(filters);
      if (!validationResult.success) {
        throw new BadRequestError("不正なフィルタです");
      }

      return await this.itemRepository.findAllWithFilters(validationResult.data);
    }

    return await this.itemRepository.findAll();
  }

  // IDでアイテムを検索する
  async findById(id: number): Promise<Item | null> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundError("アイテムが見つかりません");
    }
    return item;
  }

  // アイテムを作成する

  async create(dto: CreateItemDto): Promise<Item> {
    const imageUrl = await this.imageStorage.saveForItem(
      Date.now(), // 一時的なID（後で実際のIDに更新）
      dto.base64,
      dto.extension,
    );
    return this.itemRepository.create({
      name: dto.name,
      price: dto.price,
      content: dto.content,
      image: imageUrl,
    });
  }


  // アイテムを更新する
  async update(id: number, itemDto: UpdateItemDto): Promise<Item> {
    const updateData: Partial<
      Pick<Item, "name" | "content" | "price" | "image">
    > = {};
    // 更新するフィールドのみを設定
    if (itemDto.name !== undefined) updateData.name = itemDto.name;
    if (itemDto.content !== undefined) updateData.content = itemDto.content;
    if (itemDto.price !== undefined) updateData.price = itemDto.price;
    // 画像更新: base64 と extension の両方が渡された場合のみ処理
    if (itemDto.base64 && itemDto.extension) {
      const imageUrl = await this.imageStorage.saveForItem(
        id,
        itemDto.base64,
        itemDto.extension,
      );
      updateData.image = imageUrl;
    }

    try {
      return await this.itemRepository.update(id, updateData);
    } catch (e: any) {
      // Prisma: Record to update not found
      if (e && e.code === "P2025") {
        throw new NotFoundError("アイテムが存在しません");
      }
      throw e;
    }
  }

  // アイテムを削除する
  async delete(id: number): Promise<void> {
    try {
      await this.itemRepository.delete(id);
    } catch (e: any) {
      if (e && e.code === "P2025") {
        throw new NotFoundError("アイテムが存在しません");
      }
      throw e;
    }
  }
}

