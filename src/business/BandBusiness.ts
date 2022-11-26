import { BandDatabase } from "../data/BandDataBase";
import { BandNotFound } from "../error/BandNotFound";
import { BandInfoDTO } from "../model/Band";

const bandDB = new BandDatabase()

export class BandBusiness {
    async getBandInfos (input: string): Promise<any> {

        const queryResult: any = await bandDB.getBandInfos(input); 

        if (!queryResult[0]) {
        throw new BandNotFound()
        };
  
        const bandInfos: BandInfoDTO = {
            id: queryResult[0].id,
            name: queryResult[0].name,
            music_genre: queryResult[0].music_genre,
            responsible: queryResult[0].responsible
        };

        return bandInfos

    }
}