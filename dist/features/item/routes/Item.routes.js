"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoutes = void 0;
const express_1 = require("express");
const Item_controller_1 = require("../controllers/Item.controller");
const Item_service_1 = require("@/features/item/services/Item.service");
const Item_repository_prisma_1 = require("@/features/item/infrastructure/repositories/Item.repository.prisma");
const isAdmin_1 = require("@/middlewares/isAdmin");
const isBlockList_1 = require("@/middlewares/isBlockList");
const verifyAuthToken_1 = require("@/middlewares/verifyAuthToken");
const itemRoutes = (0, express_1.Router)();
exports.itemRoutes = itemRoutes;
// 依存性の注入 (DI)
const itemRepository = new Item_repository_prisma_1.PrismaItemRepository();
const itemService = new Item_service_1.ItemService(itemRepository);
const itemController = new Item_controller_1.ItemController(itemService);
// エンドポイントとコントローラーのメソッドを紐付け
itemRoutes.get("/", itemController.getAllItems);
itemRoutes.get("/:id", itemController.getItemById);
itemRoutes.post("/", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, isAdmin_1.isAdmin, itemController.createItem);
itemRoutes.put("/:id", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, isAdmin_1.isAdmin, itemController.updateItem);
itemRoutes.delete("/:id", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, isAdmin_1.isAdmin, itemController.deleteItem);
