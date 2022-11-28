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

        const validate: any = {
            week_day,
            start_time,
            end_time
        };

        const validateData = await showDB.validateData(validate)

        return validateData

    };

    async getShowByData(input: any) {

        const queryResult: any = await showDB.getShowByData(input);

        const idBandas: string = queryResult[0].map((u: any) => u.band_id);

        let bandQueryResult: any;
        let bandResultInfos: any = [];

        for (let i = 0; i <= idBandas.length -1; i++) {
            
            bandQueryResult = await showDB.getBandInfos(idBandas[i])
            console.log("info da banda", bandQueryResult)
            bandResultInfos.push(bandQueryResult)
    
            console.log("bandas vetor", bandResultInfos)
        };     
        
        console.log("result info", bandResultInfos)

        if (!queryResult[0]) {
            throw new ShowNotFound()
        };
     
        const showInfos: string = bandResultInfos.flat(1)

        return showInfos
    };
}