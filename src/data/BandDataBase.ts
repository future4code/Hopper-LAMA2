
import { CustomError } from "../error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_BANDAS";

  public async createUser(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
      ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible
        }).into(BandDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }
}