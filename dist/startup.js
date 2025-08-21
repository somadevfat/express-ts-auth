"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeJwtSecret = initializeJwtSecret;
// /home/soma/workspace/express-tuto/src/startup.ts
const jwtUtils_1 = require("./utils/jwtUtils"); // isJwtSecretCached を isJwtSecretCache に修正
function initializeJwtSecret() {
    try {
        const secret = (0, jwtUtils_1.getJwtSecret)();
        console.log(`✅ JWT秘密鍵の初期化に成功（長さ: ${secret.length}文字）`);
        // キャッシュの確認
        if ((0, jwtUtils_1.isJwtSecretCache)()) {
            // isJwtSecretCached を isJwtSecretCache に修正
            console.log("✅ JWT秘密鍵がメモリにキャッシュされました");
        }
    }
    catch (error) {
        console.error("❌ JWT秘密鍵の初期化に失敗");
        // エラーオブジェクトの型安全な処理
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("不明なエラーが発生しました");
        }
        if (process.env.NODE_ENV === "production") {
            console.error("本番環境のため、アプリケーションを終了します");
            process.exit(1);
        }
        else {
            console.warn("⚠️ 開発環境のため、処理を続行します");
        }
    }
}
