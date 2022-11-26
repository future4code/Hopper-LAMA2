import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { CustomError } from "../error/CustomError";
import { ParameterMissing } from "../error/ParameterMissing";

const bandBusiness = new BandBusiness()

export class BandController {

    async getBandInfos(req: Request, res: Response) {
        try {

            let { id, name } = req.body;

            if(!id && !name){
                throw new ParameterMissing();
            };

            if(!id && name){
                req.body = req.body.name
            } else if(!name && id){
                req.body = req.body.id
            } 

            const bandInfos = await bandBusiness.getBandInfos(req.body)

            res.status(200).send({ "bandInfos": bandInfos })
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        };
    }
};