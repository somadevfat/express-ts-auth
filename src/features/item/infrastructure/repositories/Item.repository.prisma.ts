import prisma from "../../../../config/prisma.config";
import { Item } from "../../../../generated/prisma";
import { ItemRepository } from "../../repositories/Item.repository";
import { CreateItemDTO } from "../../repositories/Item.repository";

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
}
