import { UserInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();
const authenticator = new Authenticator();

export class UserBusiness {

    async signup(user: UserInputDTO) {

        const {nome, email, password} = user

        if(!nome || !email || !password){
            throw new CustomError(411, "necessário");
        };

        // if(nome.length<3) {
        //     throw new InvalidName();
        // };

        // if(!email.includes("@")){
        //     throw new InvalidEmail();
        // };

        // if(password.length < 6){
        //     throw new InvalidPassword();
        // };

        const id = idGenerator.generate();

        const hashPassword = await hashManager.hash(password);

        await userDatabase.createUser(id, email, nome, hashPassword);

        const accessToken = authenticator.generateToken({ id });

        return accessToken;
    }

}