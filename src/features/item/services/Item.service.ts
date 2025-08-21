import { Item } from "@/generated/prisma";
import { PrismaItemRepository } from "../infrastructure/repositories/Item.repository.prisma";
import { CreateItemDto } from "../domain/dtos/CreateItem.dto";
import { UpdateItemDto } from "../domain/dtos/UpdateItem.dto";
import { ItemQueryParams } from "../domain/types/ItemQueryParams";
import { safeValidateItemFilters } from "../domain/dtos/NameLikeItem.dto";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { LocalImageStorage } from "../infrastructure/ImageStorage/LocalImageStorage";
import { ImageStorage } from "../application/ports/ImageStorage";
export class ItemService {
  constructor(private readonly itemRepository: PrismaItemRepository) { }

  // アイテムを全て取得する
  async findAll(filters?: ItemQueryParams): Promise<Item[]> {
    if (filters) {
      // フィルタリング条件のバリデーション
      const validationResult = safeValidateItemFilters(filters);
      if (!validationResult.success) {
        throw new Error(`Invalid filters: ${JSON.stringify(validationResult.error.flatten().fieldErrors)}`);
      }

      return await this.itemRepository.findAllWithFilters(validationResult.data);
    }

    return await this.itemRepository.findAll();
  }

  // IDでアイテムを検索する
  async findById(id: number): Promise<Item | null> {
    return this.itemRepository.findById(id);
  }

  // アイテムを作成する

  async create(dto: CreateItemDto): Promise<Item> {
    const imageStorage = new LocalImageStorage();
    const imagePath = await imageStorage.saveForItem(dto.id, dto.image, dto.extension);
    return this.itemRepository.create({
      name: dto.name,
      price: dto.price,
      content: dto.content,
      image: imagePath,
    });
  }


  // アイテムを更新する
  async update(id: number, itemDto: UpdateItemDto): Promise<Item> {
    const updateData: Partial<
      Pick<Item, "name" | "content" | "price" | "image" | "extension">
    > = {};
    // 更新するフィールドのみを設定
    if (itemDto.name !== undefined) updateData.name = itemDto.name;
    if (itemDto.content !== undefined) updateData.content = itemDto.content;
    if (itemDto.price !== undefined) updateData.price = itemDto.price;
    if (itemDto.image !== undefined) updateData.image = itemDto.image;
    if (itemDto.extension !== undefined) updateData.extension = itemDto.extension;

    return this.itemRepository.update(id, updateData);
  }

  // アイテムを削除する
  async delete(id: number): Promise<void> {
    return this.itemRepository.delete(id);
  }
}
