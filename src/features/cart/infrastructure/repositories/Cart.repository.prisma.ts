import { Cart } from "../../../../generated/prisma";
import { CartRepository } from "../../repository/Cart.repository";
import prisma from "../../../../config/prisma.config";
import { CreateCarttype, UpdateCarttype } from "../../repository/Cart.repository";

export class PrismaCartRepository implements CartRepository {

  async findAll(): Promise<Cart[]> {
    return await prisma.cart.findMany();
  }
  async findById(id: number): Promise<Cart | null> {
    return await prisma.cart.findUnique({
      where: { id },
    });
  }
  async findByIdAndUserId(itemId: number, userId: number): Promise<Cart | null> {
    return await prisma.cart.findUnique({
      where: { userId_itemId: { userId, itemId } },
    });
  }
  async create(props: CreateCarttype): Promise<Cart> {
    return await prisma.cart.create({ data: props });
  }
  async update(id: number, props: UpdateCarttype): Promise<Cart> {
    return await prisma.cart.update({
      where: { id },
      data: props,
    });
  }
}