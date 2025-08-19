import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { UserService } from "../services/User.service";
// import { InMemoryUserRepository } from "../infrastructure/repositories/User.repository.in-memory";
import { PrismaUserRepository } from "../infrastructure/repositories/User.repository.prisma";
import { isAdmin } from "../../../middlewares/isAdmin";
import { verifyAuthToken } from "../../../middlewares/verifyAuthToken";
import { isTokenBlocked } from "../../../middlewares/isBlockList";
// ユーザーリポジトリのインスタンスを作成
const router = Router();

// const userRepository = new InMemoryUserRepository();
// Prismaを使用する場合は、以下のようにリポジトリをインスタンス化
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
// ユーザー一覧取得
router.get("/users", isTokenBlocked, verifyAuthToken, isAdmin, (req, res, next) => {
  userController.findAll(req, res, next);
});

// ユーザー取得
router.get("/users/:id", isTokenBlocked, verifyAuthToken, (req, res, next) => {
  userController.findById(req, res, next);
});

// ユーザー作成
router.post("/users", verifyAuthToken, (req, res, next) => {
  userController.createUser(req, res, next);
});

// ユーザー更新
router.put("/users/:id", isTokenBlocked, verifyAuthToken, (req, res, next) => {
  userController.update(req, res, next);
});

// ユーザー削除
router.delete("/users/:id", isTokenBlocked, verifyAuthToken, isAdmin, (req, res, next) => {
  userController.delete(req, res, next);
});

export default router;
