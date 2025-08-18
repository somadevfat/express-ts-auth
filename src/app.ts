import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./features/user/routes/User.routes";
import authRoutes from "./features/auth/routes/Auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// 仮のルートをUserルートに置き換える
app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Health Check: Server is running successfully!</h1>");
});

// エラーハンドラーミドルウェアを最後に追加
app.use(errorHandler);

export default app;
