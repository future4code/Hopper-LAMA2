import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { CustomError } from "../error/CustomError";

export class UserController {
    constructor(private readonly userBusiness: UserBusiness) {}

    public signup = async (req: Request, res: Response) => {
        try {

            const { name, email, password, role } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password,
                role,
            }

            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ message: "User created", token });
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        }

        await BaseDatabase.destroyConnection();
    }

    public login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;

            const input: LoginInputDTO = {
                email,
                password
            };

            const token = await this.userBusiness.login(input);

            res.status(200).send({ message: "User Logged!", token });

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        }
    };

}
