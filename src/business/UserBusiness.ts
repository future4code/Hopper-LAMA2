import { UserInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();
const authenticator = new Authenticator();

export class UserBusiness {

    async signup(user: UserInputDTO) {

        const {nome, email, password, role} = user;

        const id = idGenerator.generate();

        const hashPassword = await hashManager.hash(password);

        await userDatabase.createUser(id, email, nome, hashPassword, role);

        const accessToken = authenticator.generateToken({ id });

        return accessToken;
    }

}