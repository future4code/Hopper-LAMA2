import { BandDatabase } from "../data/BandDataBase";
import { CustomError } from "../error/CustomError";
import { BandInfoDTO } from "../model/Band";

const bandDB = new BandDatabase()

export class BandBusiness {
    async getBandInfos (input: any): Promise<any> {

        const {id, name} = input
         
        const queryResult: any = await bandDB.getBandInfos(id, name); 

        if (!queryResult[0]) {
        throw new CustomError(400, "Band not found")
        }
  
        const bandInfos: BandInfoDTO = {
            id: queryResult[0].id,
            name: queryResult[0].name,
            music_genre: queryResult[0].music_genre,
            responsible: queryResult[0].responsible
        };

        return bandInfos

    }
}