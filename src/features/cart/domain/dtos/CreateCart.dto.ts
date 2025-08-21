import { z } from "zod";
export const CreateCartSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  itemId: z.number().int().positive("Item ID must be a positive integer"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});
export type CreateCartDTO = z.infer<typeof CreateCartSchema>;

// バリデーション関数 (コントローラーで使用)
export const validateCreateCart = (data: unknown): CreateCartDTO => {
  return CreateCartSchema.parse(data);
};

export const safeValidateCreateCart = (data: unknown) => {
  return CreateCartSchema.safeParse(data);
};


