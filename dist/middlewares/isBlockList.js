"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlocked = void 0;
const Auth_service_1 = require("../features/auth/services/Auth.service");
const TokenBlocklist_prisma_repository_1 = require("../features/auth/infrastructure/repositories/TokenBlocklist.prisma.repository");
const CustomError_1 = require("../utils/errors/CustomError");
const User_repository_prisma_1 = require("../features/user/infrastructure/repositories/User.repository.prisma");
const userRepository = new User_repository_prisma_1.PrismaUserRepository();
const tokenBlocklistRepository = new TokenBlocklist_prisma_repository_1.PrismaTokenBlocklistRepository();
const isTokenBlocked = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return next(new CustomError_1.CustomError("認証トークンが必要です", 401));
    }
    const authService = new Auth_service_1.AuthService(userRepository, tokenBlocklistRepository);
    const isBlocked = await authService.isTokenBlocked(token);
    if (isBlocked) {
        return next(new CustomError_1.CustomError("認証トークンがブロックリストに追加されています", 401));
    }
    next();
};
exports.isTokenBlocked = isTokenBlocked;
