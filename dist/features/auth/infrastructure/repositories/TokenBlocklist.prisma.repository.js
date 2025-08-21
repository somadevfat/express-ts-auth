"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTokenBlocklistRepository = void 0;
const prisma_config_1 = __importDefault(require("../../../../config/prisma.config"));
class PrismaTokenBlocklistRepository {
    async addToken(token, expiresAt) {
        await prisma_config_1.default.tokenBlocklist.create({
            data: {
                token,
                expiresAt,
            },
        });
    }
    async isTokenBlocked(token) {
        const tokenBlocklist = await prisma_config_1.default.tokenBlocklist.findUnique({
            where: {
                token,
            },
        });
        return tokenBlocklist !== null;
    }
}
exports.PrismaTokenBlocklistRepository = PrismaTokenBlocklistRepository;
