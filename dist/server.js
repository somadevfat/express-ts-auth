"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const startup_1 = require("./startup");
const port = process.env.PORT || 3000;
// アプリケーション起動時の初期化処理
(0, startup_1.initializeJwtSecret)();
const server = app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// サーバーエラーのハンドリング
server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
});
