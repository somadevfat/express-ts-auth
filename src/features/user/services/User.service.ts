import { User } from "../domain/entities/User.entity";
import { CreateUserDTO, UserRepository } from "../repositories/User.repository";
import { createUserEntity } from "../domain/entities/User.entity";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // cresteUser
  async createUser(user: CreateUserDTO): Promise<User> {
    // 入力が空ならスロー
    if (!user.email || !user.password) {
      throw new Error("Emailとパスワードは必須です");
    }
    // メールアドレスがユニークかチェック重複するならスローする
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("このメールアドレスはすでに使用されています");
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // User.tsのcreateUserEntityを使ってエンティティを作成
    const newUser = createUserEntity({
      email: user.email,
      password: hashedPassword,
    });
    // ユーザーをリポジトリに保存
    return this.userRepository.create(newUser);
  }

  // ログイン状態を確認する
  async findMe(): Promise<User | null> {
    return this.userRepository.findMe();
  }

  // IDでユーザーを検索する
  async findById(id: number): Promise<User | null> {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }
    return user;
  }
}
