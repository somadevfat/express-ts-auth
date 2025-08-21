import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/User.service";
import { safeValidateCreateUser } from "../domain/dtos/CreateUser.dto";
import { safeValidateUpdateUser } from "../domain/dtos/UpdateUser.dto";

export class UserController {
  constructor(private readonly userService: UserService) { }

  // ユーザーを作成する
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. リクエストボディの検証
      const validationResult = safeValidateCreateUser(req.body);

      if (!validationResult.success) {
        // バリデーションエラー
        return res.status(422).json({
          message: "入力データの検証に失敗しました",
          errors: validationResult.error.flatten(),
        });
      }

      // 2. ユーザー作成処理の実行
      const user = await this.userService.createUser(validationResult.data);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  // IDでユーザーを検索する
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.findById(Number(req.params.id));
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // ログイン情報確認
  async findMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(404).json({ message: "認証情報が見つかりません" });
      }
      const realUser = await this.userService.findById(Number(userId));
      if (!realUser) {
        return res.status(404).json({ message: "ユーザーが見つかりません" });
      }
      const me = {
        id: realUser.id,
        name: realUser.name,
        email: realUser.email,
      };
      res.json(me);
    } catch (error) {
      next(error);
    }
  }

  // メールアドレスでユーザーを検索する
  async findByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.findByEmail(req.params.email);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // ユーザーを更新する
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. リクエストボディの検証
      const validationResult = safeValidateUpdateUser(req.body);

      if (!validationResult.success) {
        // バリデーションエラー
        return res.status(422).json({
          message: "入力データの検証に失敗しました",
          errors: validationResult.error.flatten(),
        });
      }

      // 2. ユーザー更新処理の実行
      const updatedUser = await this.userService.update(
        Number(req.params.id),
        validationResult.data
      );
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  // ユーザーを削除する
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // 全てのユーザーを返す
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
