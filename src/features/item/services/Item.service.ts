import { Item } from "@/generated/prisma";
import { PrismaItemRepository } from "../infrastructure/repositories/Item.repository.prisma";
import { CreateItemDto } from "../domain/dtos/CreateItem.dto";
import { UpdateItemDto } from "../domain/dtos/UpdateItem.dto";

export class ItemService {
  constructor(private readonly itemRepository: PrismaItemRepository) { }

  // アイテムを全て取得する
  async findAll(): Promise<Item[]> {
    // 1. アイテムを全て取得
    return await this.itemRepository.findAll();
  }

  // IDでアイテムを検索する
  async findById(id: number): Promise<Item | null> {
    return this.itemRepository.findById(id);
  }

  // アイテムを作成する
  async create(itemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.create({
      name: itemDto.name,
      content: itemDto.content,
      price: itemDto.price,
      image: itemDto.image,
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
    if (itemDto.image !== undefined) updateData.image = itemDto.image;

    return this.itemRepository.update(id, updateData);
  }

  // アイテムを削除する
  async delete(id: number): Promise<void> {
    return this.itemRepository.delete(id);
  }
}
