import { Cart } from "../../../generated/prisma";
import { CreateCartDTO } from "../domain/dtos/CreateCart.dto";

export interface CartRepository {
  findAll(): Promise<Cart[]>;
  findById(id: number): Promise<Cart | null>;
  create(props: CreateCartDTO): Promise<Cart>;
  update(id: number, props: Partial<Cart>): Promise<Cart>;
}