import { ShowDatabase } from "../data/ShowDataBase";
import { ParameterMissing } from "../error/ParameterMissing";
import { ShowNotFound } from "../error/ShowNotFound";
import { FullTimeShow } from "../error/FullTimeShow";
import { ShowTime } from "../error/ShowTime";
import { ShowInputDTO } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator();
const showDB = new ShowDatabase();

export class ShowBusiness {

    async createShow(input: ShowInputDTO) {

        const { week_day, start_time, end_time, band_id } = input

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

        if (start_time.toString().length > 2) {
            throw new FullTimeShow()
        };
        if (end_time.toString().length > 2) {
            throw new FullTimeShow()
        };

        const createdShow = await showDB.createShow(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        );

        return createdShow
    };

    async validateData(input: any) {

        const { week_day, start_time, end_time } = input

        console.log("input no bs", input)

        const validate: any = {
            week_day,
            start_time,
            end_time
        };

        const validateData = await showDB.validateData(validate)

        console.log('validateData no business', validateData)
        return validateData

    };

    async getShowByData(input: any) {

        const queryResult: any = await showDB.getShowByData(input);
        console.log("queryResult no business", queryResult[0])

        const idBanda: string[] = [queryResult[0].band_id];

        const bandQueryResult: any = await showDB.getBandInfos(idBanda);

        if (!queryResult[0]) {
            throw new ShowNotFound()
        };
        console.log('bandQueryResult no business', bandQueryResult[0].map((u: any) => u.name));

        const showInfos: string = bandQueryResult[0].map((u: any) => { return [u.name, u.music_genre] });

        console.log('info show no business', showInfos)

        return showInfos
    };
}