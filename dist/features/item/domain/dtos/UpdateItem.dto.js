"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidateUpdateItem = exports.validateUpdateItem = exports.UpdateItemSchema = void 0;
// path: /home/soma/workspace/express-tuto/src/features/item/domain/dtos/UpdateItem.dto.ts
const zod_1 = require("zod");
// 更新時は全ての項目を任意(partial)にする
exports.UpdateItemSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .max(255, "Name must be at most 255 characters")
        .optional(),
    price: zod_1.z
        .number()
        .int()
        .positive("Price must be a positive integer")
        .optional(),
    content: zod_1.z.string().min(1, "Content is required").optional(),
    image: zod_1.z.string().url("Image URL must be a valid URL").optional(),
});
// バリデーション関数 (コントローラーで使用)
const validateUpdateItem = (data) => {
    return exports.UpdateItemSchema.parse(data);
};
exports.validateUpdateItem = validateUpdateItem;
const safeValidateUpdateItem = (data) => {
    return exports.UpdateItemSchema.safeParse(data);
};
exports.safeValidateUpdateItem = safeValidateUpdateItem;
