// path: /home/soma/workspace/express-tuto/src/features/item/repositories/Item.repository.ts
import { Item } from "../../../generated/prisma";
import { ItemQueryParams } from "../domain/types/ItemQueryParams";

export type CreateItemDTO = Pick<
  Item,
  "name" | "content" | "price" | "image"
>;
export interface ItemRepository {
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  create(props: CreateItemDTO): Promise<Item>;
  update(id: number, props: Partial<Item>): Promise<Item>;
  delete(id: number): Promise<void>;
  findAllWithFilters(props: ItemQueryParams): Promise<Item[]>;
}
