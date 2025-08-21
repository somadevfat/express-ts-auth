import { z } from "zod";
export const CreateItemSchema = z.object({
  id: z.number().int().positive("ID must be a positive integer"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),
  price: z.number().int().positive("Price must be a positive integer"),
  content: z.string().min(1, "Content is required"),
  image: z.string().regex(/^data:image\/[a-zA-Z]+;base64,/, "data URI形式の画像を指定してください"),
  extension: z.enum(["png", "jpg", "jpeg", "webp"]),
});
export type CreateItemDto = z.infer<typeof CreateItemSchema>;

// バリデーション関数 (コントローラーで使用)
export const validateCreateItem = (data: unknown): CreateItemDto => {
  return CreateItemSchema.parse(data);
};

export const safeValidateCreateItem = (data: unknown) => {
  return CreateItemSchema.safeParse(data);
};
