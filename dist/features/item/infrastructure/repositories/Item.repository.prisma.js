"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaItemRepository = void 0;
const prisma_config_1 = __importDefault(require("../../../../config/prisma.config"));
class PrismaItemRepository {
    async findAll() {
        return prisma_config_1.default.item.findMany();
    }
    async findById(id) {
        return prisma_config_1.default.item.findUnique({
            where: {
                id,
            },
        });
    }
    async create(props) {
        return prisma_config_1.default.item.create({
            data: {
                name: props.name,
                content: props.content,
                price: props.price,
                image: props.image,
            },
        });
    }
    async update(id, props) {
        return prisma_config_1.default.item.update({
            where: {
                id,
            },
            data: {
                name: props.name,
                content: props.content,
                price: props.price,
                image: props.image,
            },
        });
    }
    async delete(id) {
        await prisma_config_1.default.item.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaItemRepository = PrismaItemRepository;
