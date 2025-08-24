import { Router } from "express";
import { ItemController } from "../controllers/Item.controller";
import { ItemService } from "@/features/item/services/Item.service";
import { PrismaItemRepository } from "@/features/item/infrastructure/repositories/Item.repository.prisma";
import { isAdmin } from "@/middlewares/isAdmin";
import { isTokenBlocked } from "@/middlewares/isBlockList";
import { verifyAuthToken } from "@/middlewares/verifyAuthToken";
import { LocalImageStorage } from "../infrastructure/ImageStorage/LocalImageStorage";
import { validateCreateItem, validateUpdateItem } from "../middlewares/validation.middlewere";

const itemRoutes = Router();

// 依存性の注入 (DI)
const itemRepository = new PrismaItemRepository();
const imageStorage = new LocalImageStorage(`${process.cwd()}/storage/public/items`, `/storage/items`);
const itemService = new ItemService(itemRepository, imageStorage);
const itemController = new ItemController(itemService);

// エンドポイントとコントローラーのメソッドを紐付け
itemRoutes.get("/",  itemController.getAllItems);
itemRoutes.get("/:id",  itemController.getItemById);
itemRoutes.post(
  "/",
  verifyAuthToken,
  isTokenBlocked,
  isAdmin,
  validateCreateItem,
  itemController.createItem
);

itemRoutes.put(
  "/:id",
  verifyAuthToken,
  isTokenBlocked,
  isAdmin,
  validateUpdateItem,
  itemController.updateItem
);

itemRoutes.delete(
  "/:id",
  verifyAuthToken,
  isTokenBlocked,
  isAdmin,
  itemController.deleteItem
);

export { itemRoutes };
