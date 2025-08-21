"use strict";
// src/middlewares/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const CustomError_1 = require("../utils/errors/CustomError");
const errorHandler = (error, req, res, next) => {
    console.error("Error occurred:", error);
    // Zodバリデーションエラーの処理
    if (error instanceof zod_1.ZodError) {
        return res.status(422).json({
            message: "入力データの検証に失敗しました",
            errors: error.flatten(),
        });
    }
    // カスタムエラーの処理
    if (error instanceof CustomError_1.CustomError) {
        return res.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode,
        });
    }
    // その他の予期しないエラーの処理
    return res.status(500).json({
        message: "サーバー内部でエラーが発生しました",
        statusCode: 500,
    });
};
exports.errorHandler = errorHandler;
