
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
        // .orderBy("start_time", "asc")
        .into(ShowDatabase.TABLE_NAME);

      return result

    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };

  public async getBandInfos(input: any) {
    try {
      const banda = await this.getConnection().raw(`
      SELECT band_id, name, music_genre FROM ${ShowDatabase.TABLE_NAME} AS shows
      JOIN ${`LAMA_BANDAS`} AS bandas ON bandas.id = shows.band_id
      WHERE shows.band_id = ${input}
      `)

      return banda

    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };

  public async validateData(input: any) {
    try {

      console.log("input no db", input)
      const font = await this.getConnection()
        .select("*")
        .where({
          week_day: input.week_day,
          start_time: input.start_time,
          end_time: input.end_time
        }).into(ShowDatabase.TABLE_NAME);

      if (font.length === 0) {
        return 0
      } else {
        return 1
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  }
}
