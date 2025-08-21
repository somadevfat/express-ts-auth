import prisma from "../../../../config/prisma.config";
import { Item } from "../../../../generated/prisma";
import { ItemRepository } from "../../repositories/Item.repository";
import { CreateItemDTO } from "../../repositories/Item.repository";
import { ItemQueryParams, ItemWhereConditions } from "../../domain/types/ItemQueryParams";

export class PrismaItemRepository implements ItemRepository {
  async findAll(): Promise<Item[]> {
    return prisma.item.findMany();
  }

  async findById(id: number): Promise<Item | null> {
    return prisma.item.findUnique({
      where: {
        id,
      },
    });
  }

  async create(props: CreateItemDTO): Promise<Item> {
    return prisma.item.create({
      data: {
        name: props.name,
        content: props.content,
        price: props.price,
        image: props.image,
      },
    });
  }

  async update(id: number, props: Partial<Item>): Promise<Item> {
    return prisma.item.update({
      where: {
        id,
      },
      data: {
        name: props.name,
        content: props.content,
        price: props.price,
        image: props.image,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.item.delete({
      where: {
        id,
      },
    });
  }
  async findAllWithFilters(filters: ItemQueryParams): Promise<Item[]> {
    const whereConditions: ItemWhereConditions = {};

    // 名前の部分一致検索
    if (filters.name_like) {
      whereConditions.name = {
        contains: filters.name_like,
      };
    }

    // 価格フィルタリング
    if (filters.price_gte || filters.price_lte || filters.price_gt || filters.price_lt) {
      whereConditions.price = {};

      if (filters.price_gte !== undefined) {
        whereConditions.price.gte = filters.price_gte;
      }
      if (filters.price_lte !== undefined) {
        whereConditions.price.lte = filters.price_lte;
      }
      if (filters.price_gt !== undefined) {
        whereConditions.price.gt = filters.price_gt;
      }
      if (filters.price_lt !== undefined) {
        whereConditions.price.lt = filters.price_lt;
      }
    }

    // ページネーション
    const skip = filters.page && filters.limit ? (filters.page - 1) * filters.limit : 0;
    const take = filters.limit || undefined;

    return prisma.item.findMany({
      where: whereConditions,
      skip,
      take,
      orderBy: {
        id: 'asc',
      },
    });
  }
}
