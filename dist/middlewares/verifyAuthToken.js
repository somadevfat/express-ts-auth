"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtUtils_1 = require("../utils/jwtUtils");
const isJwtPayload_1 = require("../features/auth/domain/typeguards/isJwtPayload");
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "ヘッダーが存在しないか、Bearerで始まっていません" });
        }
        const token = authHeader.split(" ")[1];
        const secret = (0, jwtUtils_1.getJwtSecret)();
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if ((0, isJwtPayload_1.isJwtPayload)(decoded)) {
            req.user = decoded;
            return next();
        }
        return res.status(401).json({ message: "トークンのペイロードが無効です" });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: "トークン期限切れ" });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: "トークンが無効です" });
        }
        return res
            .status(500)
            .json({ message: "認証中に不明なエラーが発生しました" });
    }
};
exports.verifyAuthToken = verifyAuthToken;
