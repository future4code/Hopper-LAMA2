import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { CustomError } from "../error/CustomError";
import { DuplicateEnter } from "../error/DuplicateEnter";
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

            const validate = await showBusiness.validateData(input)
            console.log("validate no controller", validate)

            if (validate === 0) {
                await showBusiness.createShow(input)
            } else {
                throw new DuplicateEnter()
            };

            res.status(200).send("Show created!")

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        };
    };

    async getShowByData(req: Request, res: Response): Promise<any> {
        try {

            const { week_day } = req.body

            const showInfos = await showBusiness.getShowByData(week_day)

            res.status(200).send({ "Show infos": showInfos })

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        };
    };
};