"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const User_service_1 = require("../services/User.service");
// import { InMemoryUserRepository } from "../infrastructure/repositories/User.repository.in-memory";
const User_repository_prisma_1 = require("../infrastructure/repositories/User.repository.prisma");
const isAdmin_1 = require("../../../middlewares/isAdmin");
const verifyAuthToken_1 = require("../../../middlewares/verifyAuthToken");
const isBlockList_1 = require("../../../middlewares/isBlockList");
// ユーザーリポジトリのインスタンスを作成
const router = (0, express_1.Router)();
// const userRepository = new InMemoryUserRepository();
// Prismaを使用する場合は、以下のようにリポジトリをインスタンス化
const userRepository = new User_repository_prisma_1.PrismaUserRepository();
const userService = new User_service_1.UserService(userRepository);
const userController = new User_controller_1.UserController(userService);
// ユーザー一覧取得
router.get("/users", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, isAdmin_1.isAdmin, (req, res, next) => {
    userController.findAll(req, res, next);
});
// ユーザー取得
router.get("/users/:id", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, (req, res, next) => {
    userController.findById(req, res, next);
});
// ユーザー作成
router.post("/users", verifyAuthToken_1.verifyAuthToken, (req, res, next) => {
    userController.createUser(req, res, next);
});
// ユーザー更新
router.put("/users/:id", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, (req, res, next) => {
    userController.update(req, res, next);
});
// ユーザー削除
router.delete("/users/:id", isBlockList_1.isTokenBlocked, verifyAuthToken_1.verifyAuthToken, isAdmin_1.isAdmin, (req, res, next) => {
    userController.delete(req, res, next);
});
exports.default = router;
