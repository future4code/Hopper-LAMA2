import { Request, Response } from "express";
import { BandDatabase } from "../data/BandDataBase";
import { CustomError } from "../error/CustomError";

const bandDB = new BandDatabase()

export class BandController {

    async getBandInfos (req: Request, res: Response){
        try {

            const {id, name} = req.body

            const bandInfos = await bandDB.getBandInfos(id, name)

            res.status(200).send({ "bandInfos": bandInfos })
            
        }catch (error: any) {
            throw new CustomError(400, error.message);
          }
    };
}