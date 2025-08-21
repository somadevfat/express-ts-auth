"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const User_routes_1 = __importDefault(require("./features/user/routes/User.routes"));
const Auth_routes_1 = __importDefault(require("./features/auth/routes/Auth.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const Item_routes_1 = require("./features/item/routes/Item.routes"); // 追加
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)("dev"));
// Swagger UIの設定
const loadOpenApiSpec = () => {
    try {
        const specPath = path_1.default.join(__dirname, '../dist/openapi-merged.json');
        const specContent = fs_1.default.readFileSync(specPath, 'utf8');
        const spec = JSON.parse(specContent);
        // サーバーURLを現在のポートに合わせて更新
        spec.servers[0].variables.server.default = `http://localhost:${process.env.PORT || 3000}/api`;
        return spec;
    }
    catch (error) {
        console.error('OpenAPI仕様の読み込みに失敗:', error);
        return null;
    }
};
const openApiSpec = loadOpenApiSpec();
// Swagger UIを /docs パスで提供
if (openApiSpec) {
    exports.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiSpec, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "Express API Documentation"
    }));
}
// ルーターの登録
exports.app.use("/api/users", User_routes_1.default);
exports.app.use("/api/items", Item_routes_1.itemRoutes);
exports.app.use("/api/auth", Auth_routes_1.default);
exports.app.get("/", (req, res) => {
    res.send("<h1>Health Check: Server is running successfully!</h1>");
});
// エラーハンドラーミドルウェアを最後に追加
exports.app.use(errorHandler_1.errorHandler);
exports.default = exports.app;
