import express from "express";
import { AuthController } from "../controllers/Auth.controller";
import { PrismaUserRepository } from "../../user/infrastructure/repositories/User.repository.prisma";
import { AuthService } from "../services/Auth.service";
const router = express.Router();

// DIコンテナがないため手動で依存性を注入
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/signin", authController.signin.bind(authController));

export default router;
