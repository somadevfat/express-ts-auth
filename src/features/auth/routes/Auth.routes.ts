import express from "express";
import { AuthController } from "../controllers/Auth.controller";
import { PrismaUserRepository } from "../../user/infrastructure/repositories/User.repository.prisma";
import { AuthService } from "../services/Auth.service";
import { PrismaTokenBlocklistRepository } from "../infrastructure/repositories/TokenBlocklist.prisma.repository";
import { isTokenBlocked } from "../../../middlewares/isBlockList";
const router = express.Router();

const userRepository = new PrismaUserRepository();
const tokenBlocklistRepository = new PrismaTokenBlocklistRepository();
const authService = new AuthService(userRepository, tokenBlocklistRepository);
const authController = new AuthController(authService);

router.post("/signin", authController.signin.bind(authController));
router.post("/admin/signin", authController.adminSignin.bind(authController));
router.post("/logout", isTokenBlocked, authController.logout.bind(authController));


export default router;
