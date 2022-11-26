
import { CustomError } from "../error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_BANDAS";

  public async createBand(
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
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    }
  };

  public async getBandInfos(input: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .where({ id: input })
        .orWhere({ name: input })
        .into(BandDatabase.TABLE_NAME);

      return result
      
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };
}