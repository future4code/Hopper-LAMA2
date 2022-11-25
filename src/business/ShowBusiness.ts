import { ShowDatabase } from "../data/ShowDataBase";
import { CustomError } from "../error/CustomError";
import { ShowInfoDTO, ShowInputDTO } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator();
const showDB = new ShowDatabase();

export class ShowBusiness {

    async createShow(show: ShowInputDTO) {

        const { week_day, start_time, end_time, band_id } = show

        const id = idGenerator.generate();

        if (!week_day || !start_time || !end_time || !band_id) {
            throw new CustomError(412, "Some parameter is missing.")
        };

        if (start_time < 08) {
            throw new CustomError(400, "Hours less than 8am.")
        };

        if (end_time > 23) {
            throw new CustomError(400, "Time over 11pm.")
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

        res
    };
}