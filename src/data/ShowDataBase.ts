
import { CustomError } from "../error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_SHOWS";

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          week_day,
          start_time,
          end_time,
          band_id
        }).into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };

  public async getShowByData(input: string) {
    try {
      const result = await this.getConnection()
        .select("*")
        .where({ week_day: input })
        .orderBy("start_time", "asc")
        .into(ShowDatabase.TABLE_NAME);

      return result

    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };

  public async getBandInfos(input: string) {
    try {
      const banda = await this.getConnection().raw(`
      SELECT band_id, name, music_genre FROM ${ShowDatabase.TABLE_NAME}
      JOIN ${`LAMA_BANDAS`} ON band_id = ${input} 
      `)
    
      return banda
      
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };
}
