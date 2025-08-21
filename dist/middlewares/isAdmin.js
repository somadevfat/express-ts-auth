"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const CustomError_1 = require("../utils/errors/CustomError");
const isAdmin = (req, res, next) => {
    const user = req.user; // req.body.user を req.user に修正
    // ユーザー情報がリクエストに含まれていることを確認
    if (!user || !user.isAdmin) {
        // 管理者でない場合は403 Forbiddenエラーを返す
        return next(new CustomError_1.CustomError("管理者権限が必要です", 403));
    }
    // 管理者の場合は次のミドルウェアへ進む
    next();
};
exports.isAdmin = isAdmin;
