import { Router } from "express";
import { ItemController } from "../controllers/Item.controller";
import { ItemService } from "@/features/item/services/Item.service";
import { PrismaItemRepository } from "@/features/item/infrastructure/repositories/Item.repository.prisma";
import { isAdmin } from "@/middlewares/isAdmin";
import { isTokenBlocked } from "@/middlewares/isBlockList";
import { verifyAuthToken } from "@/middlewares/verifyAuthToken";

const itemRoutes = Router();

// 依存性の注入 (DI)
const itemRepository = new PrismaItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

// エンドポイントとコントローラーのメソッドを紐付け
itemRoutes.get("/", itemController.getAllItems);
itemRoutes.get("/:id", itemController.getItemById);
itemRoutes.post(
  "/",
  isTokenBlocked,
  verifyAuthToken,
  isAdmin,
  itemController.createItem
);

itemRoutes.put(
  "/:id",
  isTokenBlocked,
  verifyAuthToken,
  isAdmin,
  itemController.updateItem
);

itemRoutes.delete(
  "/:id",
  isTokenBlocked,
  verifyAuthToken,
  isAdmin,
  itemController.deleteItem
);

export { itemRoutes };
