import { NextFunction, Request, Response } from "express";
import { CartService } from "../service/Cart.service";
import { safeValidateCreateCart } from "../domain/dtos/CreateCart.dto";
import { safeValidateUpdateCart } from "../domain/dtos/UpdateCart.dto";

export class CartController {
  constructor(private readonly cartService: CartService) { }

  // ユーザーを作成する
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.body = ", req.body);
      // 1. リクエストボディの検証
      const validationResult = safeValidateCreateCart(req.body);

      if (!validationResult.success) {
        // バリデーションエラー
        return res.status(422).json({
          message: "入力データの検証に失敗しました",
          errors: validationResult.error.flatten(),
        });
      }
      console.log("validationResult = ", validationResult);
      const cart = await this.cartService.create(validationResult.data);
      res.status(201).json(cart);
    } catch (error) {
      console.error("cart create error = ", error);
      next(error);
    }
  }

  // IDでユーザーを検索する
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.findById(Number(req.params.id));
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  // ユーザーを更新する
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. リクエストボディの検証
      const validationResult = safeValidateUpdateCart(req.body);
      console.log("validationResult = ", validationResult);

      if (!validationResult.success) {
        // バリデーションエラー
        return res.status(422).json({
          message: "入力データの検証に失敗しました",
          errors: validationResult.error.flatten(),
        });
      }

      // 2. ユーザー更新処理の実行
      const updatedCart = await this.cartService.update(
        Number(req.params.id),
        validationResult.data
      );
      res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }

  // 全てのユーザーを返す
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carts = await this.cartService.findAll();
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }
}
