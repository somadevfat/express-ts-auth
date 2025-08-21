"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_config_1 = __importDefault(require("../../../../config/prisma.config"));
class PrismaUserRepository {
    async findAll() {
        return await prisma_config_1.default.user.findMany();
    }
    async findById(id) {
        return await prisma_config_1.default.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email) {
        return await prisma_config_1.default.user.findUnique({
            where: { email },
        });
    }
    // findMeの実装は認証方法に依存するため、一旦nullを返すようにしておきます。
    // JWTなどを使う際に、デコードしたIDを使ってfindByIdを呼び出す形になります。
    async findMe() {
        // TODO: 認証ロジックに基づいて実装
        return null;
    }
    async create(props) {
        return await prisma_config_1.default.user.create({
            data: {
                name: "", // 必須フィールドのため一時的に空文字を設定
                email: props.email,
                password: props.password,
            },
        });
    }
    async update(id, props) {
        return await prisma_config_1.default.user.update({
            where: { id },
            data: props,
        });
    }
    async delete(id) {
        await prisma_config_1.default.user.delete({
            where: { id },
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
