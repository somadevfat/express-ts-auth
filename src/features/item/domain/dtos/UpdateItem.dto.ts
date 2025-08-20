// path: /home/soma/workspace/express-tuto/src/features/item/domain/dtos/UpdateItem.dto.ts
import { z } from "zod";

// 更新時は全ての項目を任意(partial)にする
export const UpdateItemSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters")
    .optional(),
  price: z
    .number()
    .int()
    .positive("Price must be a positive integer")
    .optional(),
  content: z.string().min(1, "Content is required").optional(),
  image: z.string().url("Image URL must be a valid URL").optional(),
});

export type UpdateItemDto = z.infer<typeof UpdateItemSchema>;

// バリデーション関数 (コントローラーで使用)
export const validateUpdateItem = (data: unknown): UpdateItemDto => {
  return UpdateItemSchema.parse(data);
};

export const safeValidateUpdateItem = (data: unknown) => {
  return UpdateItemSchema.safeParse(data);
};
