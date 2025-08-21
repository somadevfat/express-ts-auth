import { Cart } from "@/generated/prisma";
import { PrismaCartRepository } from "../infrastructure/repositories/Cart.repository";
import { CreateCartDTO } from "../domain/dtos/CreateCart.dto";
import { UpdateCartDTO } from "../domain/dtos/UpdateCart.dto";

export class CartService {
  constructor(private readonly cartRepository: PrismaCartRepository) { }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.findAll();
  }

  async findById(id: number): Promise<Cart | null> {
    return this.cartRepository.findById(id);
  }

  async create(cartDto: CreateCartDTO): Promise<Cart> {
    return this.cartRepository.create(cartDto);
  }

  async update(id: number, cartDto: UpdateCartDTO): Promise<Cart> {
    return this.cartRepository.update(id, cartDto);
  }



}