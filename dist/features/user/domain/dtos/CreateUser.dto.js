"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidateCreateUser = exports.validateCreateUser = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: "名前は必須です" })
        .max(50, { message: "名前は50文字以内で入力してください" })
        .trim()
        .refine((val) => val.length > 0, {
        message: "名前は空白のみでは入力できません",
    }),
    email: zod_1.z
        .string()
        .email({ message: "有効なメールアドレスを入力してください" })
        .toLowerCase()
        .trim()
        .max(255, { message: "メールアドレスが長すぎます" }),
    password: zod_1.z
        .string()
        .min(8, { message: "パスワードは8文字以上である必要があります" })
        .max(128, { message: "パスワードは128文字以内で入力してください" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: "パスワードは大文字・小文字・数字・特殊文字(@$!%*?&)を含む必要があります",
    }),
});
const validateCreateUser = (data) => {
    return exports.CreateUserSchema.parse(data);
};
exports.validateCreateUser = validateCreateUser;
const safeValidateCreateUser = (data) => {
    return exports.CreateUserSchema.safeParse(data);
};
exports.safeValidateCreateUser = safeValidateCreateUser;
