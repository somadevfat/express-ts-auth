"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidateSignin = exports.validateSignin = exports.SigninSchema = void 0;
const zod_1 = require("zod");
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "有効なメールアドレスを入力してください" })
        .toLowerCase()
        .trim(),
    password: zod_1.z.string().min(1, { message: "パスワードは必須です" }),
});
const validateSignin = (data) => {
    // Zodスキーマを使用してデータを検証okならスキーマデータ返す例外（ZodError）を投げる
    return exports.SigninSchema.parse(data);
};
exports.validateSignin = validateSignin;
// if でエラー投げれるsafeParseを使うと、エラーがあっても例外を投げずに結果を返す
const safeValidateSignin = (data) => {
    return exports.SigninSchema.safeParse(data);
};
exports.safeValidateSignin = safeValidateSignin;
