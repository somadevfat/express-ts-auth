import { User } from "../domain/entities/User.entity";
export type CreateUserDTO = Pick<User, "email" | "password">;
export interface UserRepository {
  findMe(): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(props: Pick<User, "email" | "password">): Promise<User>;
}
