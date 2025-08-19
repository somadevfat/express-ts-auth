import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import { safeValidateSignin } from "../domain/dtos/Signin.dto";
import { ZodError } from "zod";

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  async signin(req: Request, res: Response) {
    // 1. リクエストボディの検証
    const validationResult = safeValidateSignin(req.body);

    if (!validationResult.success) {
      // バリデーションエラー
      return res.status(422).json({
        message: "入力データの検証に失敗しました",
        errors: validationResult.error.flatten(),
      });
    }

    try {
      // 2. 認証処理の実行
      const token = await this.authService.signin(validationResult.data);

      if (!token) {
        // 認証失敗
        return res.status(401).json({ message: "メールアドレスまたはパスワードが正しくありません" });
      }

      // 3. 認証成功
      res.status(200).json({ token });
    } catch (error) {
      // 予期せぬエラー
      console.error("Signin error:", error);
      res.status(500).json({ message: "サーバー内部でエラーが発生しました" });
    }
  }
  async adminSignin(req: Request, res: Response) {
    const validationResult = safeValidateSignin(req.body);

    if (!validationResult.success) {
      // バリデーションエラー
      return res.status(422).json({
        message: "入力データの検証に失敗しました",
        errors: validationResult.error.flatten(),
      });
    }

    try {
      // 2. 認証処理の実行
      const token = await this.authService.signin(validationResult.data);

      if (!token) {
        // 認証失敗
        return res.status(401).json({ message: "メールアドレスまたはパスワードが正しくありません" });
      }

      // 3. 認証成功
      res.status(200).json({ token });
    } catch (error) {
      // 予期せぬエラー
      console.error("AdminSignin error:", error);
      res.status(500).json({ message: "サーバー内部でエラーが発生しました" });
    }
  }
  async logout(req: Request, res: Response) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "認証トークンが必要です" });
    }
    try {
      await this.authService.logout(token);
      res.status(200).json({ message: "ログアウトしました" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "サーバー内部でエラーが発生しました" });
    }
  }
}
