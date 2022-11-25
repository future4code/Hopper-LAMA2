import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDataBase";
import { CustomError } from "../error/CustomError";
import { ShowInputDTO } from "../model/Show";

const showBusiness = new ShowBusiness();


export class ShowController {

    async createShow(req: Request, res: Response): Promise<void> {
        try {

            const { week_day, start_time, end_time, band_id } = req.body;

            const input: ShowInputDTO = {
                week_day,
                start_time,
                end_time,
                band_id
            }

            await showBusiness.createShow(input)

            res.status(200).send("Show created!")

        } catch (error: any) {
            throw new CustomError(400, error.message);
          }
    };
}