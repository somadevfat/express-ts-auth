"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.InternalServerError = exports.BadRequestError = exports.UnauthorizedError = exports.ConflictError = exports.NotFoundError = exports.ValidationError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Errorクラスのスタックトレースを正しく設定
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
// バリデーションエラーやその他のカスタムエラーを定義するためのクラスを追加します。
class ValidationError extends CustomError {
    constructor(message) {
        super(message, 422);
    }
}
exports.ValidationError = ValidationError;
// 404 Not Foundエラーを定義 ファイルなどがない場合に使用
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
// データ競合エラー データが競合した場合に使用
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
// 認証エラー 401 Unauthorizedを表すクラス 認証が必要な場合に使用
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
// リクエストが不正な場合に使用する400 Bad Requestエラーを定義
class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
// サーバー内部エラー 500 Internal Server Errorを表すクラス
class InternalServerError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
// Forbiddenエラー 403 Forbiddenを表すクラス アクセス権限がない場合に使用
class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
