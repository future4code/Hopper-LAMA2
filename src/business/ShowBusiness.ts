import { ShowDatabase } from "../data/ShowDataBase";
import { CustomError } from "../error/CustomError";
import { ParameterMissing } from "../error/ParameterMissing";
import { ShowTime } from "../error/ShowTime";
import { ShowInputDTO } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator();
const showDB = new ShowDatabase();

export class ShowBusiness {

    async createShow(show: ShowInputDTO) {

        const { week_day, start_time, end_time, band_id } = show

        const id = idGenerator.generate();

        if (!week_day || !start_time || !end_time || !band_id) {
            throw new ParameterMissing()
        };

        if (start_time < 8) {
            throw new ShowTime()
        };

        if (end_time > 23) {
            throw new ShowTime()
        };

        if (!Number.isInteger(start_time / end_time)) {
            throw new CustomError(400, "Cannot have start time or end time less than 1 hour")
        };

        //verificar se ja tem um show marcado no dia e horário.

        await showDB.createShow(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        );

       
    };
}