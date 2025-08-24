import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import userRoutes from "./features/user/routes/User.routes";
import authRoutes from "./features/auth/routes/Auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { itemRoutes } from "./features/item/routes/Item.routes"; // 追加
import { cartRoutes } from "./features/cart/routes/Cart.route";
import myUserRoutes from "./features/user/routes/MyUser.routes";

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
  override: process.env.NODE_ENV !== 'production',
});

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger UIの設定
const loadOpenApiSpec = () => {
  try {
    const specPath = path.join(__dirname, '../dist/openapi-merged.json');
    const specContent = fs.readFileSync(specPath, 'utf8');
    const spec = JSON.parse(specContent);

    // サーバーURLを現在のポートに合わせて更新
    spec.servers[0].variables.server.default = `http://localhost:${process.env.PORT || 8080}/api`;

    return spec;
  } catch (error) {
    console.error('OpenAPI仕様の読み込みに失敗:', error);
    return null;
  }
};

const openApiSpec = loadOpenApiSpec();

// Swagger UIを /docs パスで提供
if (openApiSpec) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Express API Documentation"
  }));
}

// ルーターの登録
app.use("/api/users", userRoutes);
app.use("/api/my/user", myUserRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carts", cartRoutes);
app.use("/storage", express.static(path.join(process.cwd(), "storage", "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Health Check: Server is running successfully!</h1>");
});

// エラーハンドラーミドルウェアを最後に追加
app.use(errorHandler);

export default app;
