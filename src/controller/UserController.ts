import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { CustomError } from "../error/CustomError";

const userBusiness = new UserBusiness();

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const { nome, email, password, role } = req.body

            const input: UserInputDTO = {
                nome,
                email,
                password,
                role
            }

            const token = await userBusiness.signup(input);

            res.status(200).send({ message: "Usuário criado", token });

        } catch (error: any) {
            throw new CustomError(400, error.message)
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            // const token = await userBusiness.getUserByEmail(loginData);

            // res.status(200).send({ token });

        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
        await BaseDatabase.destroyConnection();
    }

}