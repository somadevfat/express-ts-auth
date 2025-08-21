"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidateCreateItem = exports.validateCreateItem = exports.CreateItemSchema = void 0;
const zod_1 = require("zod");
exports.CreateItemSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .max(255, "Name must be at most 255 characters"),
    price: zod_1.z.number().int().positive("Price must be a positive integer"),
    content: zod_1.z.string().min(1, "Content is required"),
    image: zod_1.z.string().url("Image URL must be a valid URL"),
});
// バリデーション関数 (コントローラーで使用)
const validateCreateItem = (data) => {
    return exports.CreateItemSchema.parse(data);
};
exports.validateCreateItem = validateCreateItem;
const safeValidateCreateItem = (data) => {
    return exports.CreateItemSchema.safeParse(data);
};
exports.safeValidateCreateItem = safeValidateCreateItem;
