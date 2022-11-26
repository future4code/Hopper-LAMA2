
import { CustomError } from "../error/CustomError";
import { Role } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_USUÁRIOS";

  public async createUser(
    id: string,
    nome: string,
    email: string,
    password: string,
    role: Role
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          nome,
          email,
          password,
          role
        }).into(UserDatabase.TABLE_NAME);
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    }
  };

  public async findUser(email: string) {
    try {
      const result = await this.getConnection()
        .select("*")
        .where({ email })

      return result[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    }

  }

}
