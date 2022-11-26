import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { CustomError } from "../error/CustomError";


const userBusiness = new UserBusiness();

export class UserController {
    async signup(req: Request, res: Response): Promise<void> {
        try {

            const { name, email, password, role } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password,
                role
            }

            const token = await userBusiness.signup(input);

            res.status(200).send({ message: "User created", token });
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const { email, password } = req.body;

            const input: LoginInputDTO = {
                email,
                password
            };

            const token = await userBusiness.login(input)

            res.status(200).send({ token });

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        }
    };

}
