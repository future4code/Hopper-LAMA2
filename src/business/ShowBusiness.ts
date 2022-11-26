import { ShowDatabase } from "../data/ShowDataBase";
import { ParameterMissing } from "../error/ParameterMissing";
import { ShowNotFound } from "../error/ShowNotFound";
import { ShowTime } from "../error/ShowTime";
import { ShowDetailByDayDTO, ShowInfoDTO, ShowInputDTO } from "../model/Show";
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

        //rever que ta dando erro!

        // if (!Number.isInteger(start_time / end_time)) {
        //     throw new CustomError(400, "Cannot have start time or end time less than 1 hour")
        // };

        //verificar se ja tem um show marcado no dia e horário.

        const createdShow: any = await showDB.createShow(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        );

        return createdShow

    };

    async getShowByData(input: any) {

        const queryResult: any = await showDB.getShowByData(input);

        const diaShow = queryResult[0].week_day
        console.log("dia semana business", queryResult[0].week_day)

        const idBanda: string = queryResult[0].band_id;
        console.log("id da banda no business", idBanda)

        const bandQueryResult: any = await showDB.getBandInfos(idBanda);
        console.log("queryResult da banda no business", bandQueryResult[0])

        if (!queryResult[0]) {
            throw new ShowNotFound()
        };
        console.log('bandQueryResult no business', bandQueryResult[0].map((u:any)=>u.name));

        const showInfos: string = bandQueryResult[0].map((u:any)=>{return[u.name, u.music_genre]});
        // const bandGenre: string = bandQueryResult[0].map((u:any)=>u.music_genre);
      
        // const showInfos: any = {
        //     name: bandName,
        //     music_genre: bandGenre
        // };

        console.log('info show no business', showInfos)

        return showInfos
    }
}