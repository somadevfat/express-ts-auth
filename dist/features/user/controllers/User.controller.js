"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const CreateUser_dto_1 = require("../domain/dtos/CreateUser.dto");
const UpdateUser_dto_1 = require("../domain/dtos/UpdateUser.dto");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    // ユーザーを作成する
    async createUser(req, res, next) {
        try {
            // 1. リクエストボディの検証
            const validationResult = (0, CreateUser_dto_1.safeValidateCreateUser)(req.body);
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
        }
        catch (error) {
            next(error);
        }
    }
    // IDでユーザーを検索する
    async findById(req, res, next) {
        try {
            const user = await this.userService.findById(Number(req.params.id));
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    // ログイン情報確認
    async findMe(req, res, next) {
        try {
            const user = await this.userService.findMe();
            if (!user) {
                return res.status(404).json({ message: "ユーザーが見つかりません" });
            }
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    // メールアドレスでユーザーを検索する
    async findByEmail(req, res, next) {
        try {
            const user = await this.userService.findByEmail(req.params.email);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    // ユーザーを更新する
    async update(req, res, next) {
        try {
            // 1. リクエストボディの検証
            const validationResult = (0, UpdateUser_dto_1.safeValidateUpdateUser)(req.body);
            if (!validationResult.success) {
                // バリデーションエラー
                return res.status(422).json({
                    message: "入力データの検証に失敗しました",
                    errors: validationResult.error.flatten(),
                });
            }
            // 2. ユーザー更新処理の実行
            const updatedUser = await this.userService.update(Number(req.params.id), validationResult.data);
            res.json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    }
    // ユーザーを削除する
    async delete(req, res, next) {
        try {
            await this.userService.delete(Number(req.params.id));
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    // 全てのユーザーを返す
    async findAll(req, res, next) {
        try {
            const users = await this.userService.findAll();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
