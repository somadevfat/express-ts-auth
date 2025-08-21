"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CustomError_1 = require("../../../utils/errors/CustomError");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // ユーザーを作成する
    async createUser(userDto) {
        // メールアドレスがユニークかチェック
        const existingUser = await this.userRepository.findByEmail(userDto.email);
        if (existingUser) {
            throw new CustomError_1.ConflictError("このメールアドレスはすでに使用されています");
        }
        // パスワードをハッシュ化
        const hashedPassword = await bcrypt_1.default.hash(userDto.password, 10);
        // ユーザーをリポジトリに保存
        return this.userRepository.create({
            name: userDto.name,
            email: userDto.email,
            password: hashedPassword,
        });
    }
    // ログイン状態を確認する (実装は認証導入後)
    async findMe() {
        return this.userRepository.findMe();
    }
    // IDでユーザーを検索する
    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new CustomError_1.NotFoundError("指定されたIDのユーザーが見つかりません");
        }
        return user;
    }
    // メールアドレスでユーザーを検索する
    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new CustomError_1.NotFoundError("指定されたメールアドレスのユーザーが見つかりません");
        }
        return user;
    }
    // ユーザーを更新する
    async update(id, userDto) {
        // パスワードが含まれている場合はハッシュ化
        const updateData = { ...userDto };
        if (userDto.password) {
            updateData.password = await bcrypt_1.default.hash(userDto.password, 10);
        }
        const updatedUser = await this.userRepository.update(id, updateData);
        if (!updatedUser) {
            throw new CustomError_1.NotFoundError("更新対象のユーザーが見つかりません");
        }
        return updatedUser;
    }
    // ユーザーを削除する
    async delete(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new CustomError_1.NotFoundError("削除対象のユーザーが見つかりません");
        }
        await this.userRepository.delete(id);
    }
    // 全てのユーザーを返す
    async findAll() {
        return this.userRepository.findAll();
    }
}
exports.UserService = UserService;
