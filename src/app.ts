import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./features/user/routes/User.routes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 仮のルートをUserルートに置き換える
app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Health Check: Server is running successfully!");
});

export default app;
