import { Cart } from "../../../../generated/prisma";
import { CartRepository } from "../../repository/Cart.repository";
import prisma from "../../../../config/prisma.config";
import { CreateCartDTO } from "../../domain/dtos/CreateCart.dto";

export class PrismaCartRepository implements CartRepository {

  async findAll(): Promise<Cart[]> {
    return await prisma.cart.findMany();
  }
  async findById(id: number): Promise<Cart | null> {
    return await prisma.cart.findUnique({
      where: { id },
    });
  }
  async create(props: CreateCartDTO): Promise<Cart> {
    return await prisma.cart.create({ data: props });
  }
  async update(id: number, props: Partial<Cart>): Promise<Cart> {
    return await prisma.cart.update({
      where: { id },
      data: props,
    });
  }
}