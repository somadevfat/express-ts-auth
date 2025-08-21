"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtSecret = getJwtSecret;
exports.clearJwtSecretCache = clearJwtSecretCache;
exports.isJwtSecretCache = isJwtSecretCache;
const crypto_1 = __importDefault(require("crypto"));
// メモリキャッシュ用の変数
let jwtSecretCache = null;
function getJwtSecret() {
    console.log("\n--- getJwtSecret called ---");
    // キャッシュがあればそれを返す
    if (jwtSecretCache !== null) {
        console.log("✅ Returning cached secret.");
        return jwtSecretCache;
    }
    console.log("🤔 Cache is empty. Trying to read from .env file...");
    const envSecret = process.env.JWT_SECRET;
    if (envSecret) {
        console.log("✅ Found JWT_SECRET in .env file.");
        if (envSecret.length < 32) {
            console.warn("⚠️ Warning: JWT_SECRET is too short.");
        }
        jwtSecretCache = envSecret;
        console.log("   Caching the secret from .env file.");
        return jwtSecretCache;
    }
    else {
        console.error("❌ ERROR: JWT_SECRET not found in .env file!");
        const generatedSecret = crypto_1.default.randomBytes(32).toString("hex");
        console.warn(`   Generating a temporary random secret: ${generatedSecret}`);
        jwtSecretCache = generatedSecret;
        return jwtSecretCache;
    }
}
// キャッシュをクリアする関数（テスト用）
function clearJwtSecretCache() {
    jwtSecretCache = null;
}
// キャッシュの状態を確認する関数（デバッグ用）
function isJwtSecretCache() {
    return jwtSecretCache !== null;
}
