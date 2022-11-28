
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

  public async getShowByData(input: any) {
    console.log('input no db', input)
    try {
   
      const result = await this.getConnection().raw(`
      SELECT * FROM ${ShowDatabase.TABLE_NAME} WHERE week_day = '${input}'
      ORDER BY start_time ASC
      `)
        
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
      SELECT name, music_genre FROM ${'LAMA_BANDAS'}
      WHERE id = ${input}
      `)
   
      return banda[0]

    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
    };
  };

  public async validateData(input: any) {
    try {
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
