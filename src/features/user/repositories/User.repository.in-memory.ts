import { UserRepository } from "./User.repository";
import { User, createUserEntity } from "../domain/entities/User.entity";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    this.create({
      email: "test@example.com",
      password: "hashed_password_placeholder",
    });
  }

  //仮で作成したユーザーを返す
  async findMe(): Promise<User | null> {
    return this.users.length > 0 ? this.users[0] : null;
  }
  // IDでユーザーを検索する
  async findById(id: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }
  // メールアドレスでユーザーを検索する
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
  // ユーザーを作成する
  async create(props: Pick<User, "email" | "password">): Promise<User> {
    const newUser = createUserEntity(props);
    newUser.id = this.nextId++;
    this.users.push(newUser);
    return newUser;
  }
}
