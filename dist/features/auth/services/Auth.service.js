"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtUtils_1 = require("../../../utils/jwtUtils");
class AuthService {
    // DI
    constructor(userRepository, tokenBlocklistRepository) {
        this.userRepository = userRepository;
        this.tokenBlocklistRepository = tokenBlocklistRepository;
    }
    async signin(signinDto) {
        const { email, password } = signinDto;
        // 1. emailでユーザーを検索
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            // ユーザーが存在しない
            return null;
        }
        // 2. パスワードを比較
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            // パスワードが一致しない
            return null;
        }
        // 3. JWTを生成
        const token = this.generateJwt(user);
        return token;
    }
    async adminSignin(signinDto) {
        const { email, password } = signinDto;
        // 1. emailでユーザーを検索
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            // ユーザーが存在しない
            return null;
        }
        // 2. 管理者かどうかをチェック
        if (!user.isAdmin) {
            // 管理者ではない
            return null;
        }
        // 3. パスワードを比較
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            // パスワードが一致しない
            return null;
        }
        // 4. JWTを生成
        const token = this.generateJwt(user);
        return token;
    }
    generateJwt(user) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        };
        // 統一されたJWT秘密鍵取得方法を使用
        const secret = (0, jwtUtils_1.getJwtSecret)();
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "1h", // 有効期限を1時間に設定
        });
        return token;
    }
    async logout(token) {
        // トークンをブロックリストに追加
        await this.tokenBlocklistRepository.addToken(token, new Date());
    }
    async isTokenBlocked(token) {
        const isBlocked = await this.tokenBlocklistRepository.isTokenBlocked(token);
        return isBlocked;
    }
}
exports.AuthService = AuthService;
