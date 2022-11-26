import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
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
            };

            await showBusiness.createShow(input)

            res.status(200).send("Show created!")

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        };
    };

    async getShowByData(req: Request, res: Response): Promise<void> {
        try {

            const { week_day } = req.body

            const showInfos = await showBusiness.getShowByData(week_day)
            console.log("dia da semana no controller", week_day)
            console.log("Show infos no controller", showInfos)
            res.status(200).send({"Show infos": showInfos})

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        };
    };
};