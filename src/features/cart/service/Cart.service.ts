import { Cart } from "@/generated/prisma";
import { PrismaCartRepository } from "../infrastructure/repositories/Cart.repository.prisma";
import { CreateCarttype, UpdateCarttype } from "../repository/Cart.repository";

export class CartService {
  constructor(private readonly cartRepository: PrismaCartRepository) { }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.findAll();
  }

  async findById(id: number): Promise<Cart | null> {
    return this.cartRepository.findById(id);
  }

  async create(cartItems: CreateCarttype[]): Promise<Cart[]> {
    if (!cartItems) {
      throw new Error("Cart items are required");
    }
    
    const createdCarts: Cart[] = [];
    for (const item of cartItems) {
      const existing = await this.findByIdAndUserId(item.itemId, item.userId);
      if (existing) {
        const updatedCart = await this.cartRepository.update(existing.id, {
          quantity: existing.quantity + item.quantity,
        });
        createdCarts.push(updatedCart);
      } else {
        const createdCart = await this.cartRepository.create(item);
        createdCarts.push(createdCart);
      }
    }
    return createdCarts;
  }

  async update(id: number, cartDto: UpdateCarttype): Promise<Cart> {
    return this.cartRepository.update(id, cartDto);
  }
  async findByIdAndUserId(itemId: number, userId: number): Promise<Cart | null> {
    return this.cartRepository.findByIdAndUserId(itemId, userId);
  }
}