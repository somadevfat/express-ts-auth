// /home/soma/workspace/express-tuto/src/types/express/index.d.ts
import { JwtPayload } from "../../features/auth/domain/interfaces/JwtPayload.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
