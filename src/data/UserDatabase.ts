
import { CustomError } from "../error/CustomError";
import { user } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_USUÁRIOS";

  public createUser = async (user: user) => {
    try {
      await this.getConnection()
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        }).into(UserDatabase.TABLE_NAME);
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    }
  }

  public findUser = async (email: string) => {
    try {
      const result = await this.getConnection()
        .select()
        .where({ email })

      return result[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    }

  }

}
