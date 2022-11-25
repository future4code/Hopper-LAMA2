
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
    }
  };
}