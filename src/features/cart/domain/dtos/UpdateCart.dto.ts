// path: /home/soma/workspace/express-tuto/src/features/item/domain/dtos/UpdateItem.dto.ts
import { z } from "zod";

// 更新時は全ての項目を任意(partial)にする
export const UpdateCartSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  itemId: z.number().int().positive("Item ID must be a positive integer").optional(),
  quantity: z.number().int().positive("Quantity must be a positive integer").optional(),
});

export type UpdateCartDTO = z.infer<typeof UpdateCartSchema>;

// バリデーション関数 (コントローラーで使用)
export const validateUpdateCart = (data: unknown): UpdateCartDTO => {
  return UpdateCartSchema.parse(data);
};

export const safeValidateUpdateCart = (data: unknown) => {
  return UpdateCartSchema.safeParse(data);
};
