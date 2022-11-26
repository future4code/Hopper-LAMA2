import { UserInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";
import { InvalidName } from "../error/InvalidName";
import { InvalidEmail } from "../error/InvalidEmail";
import { InvalidRole } from "../error/InvalidRole";
import { UserNotFound } from "../error/UserNotFound ";
import { InvalidPassword } from "../error/InvalidPassword";

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();
const authenticator = new Authenticator();

export class UserBusiness {

    async signup(input: UserInputDTO): Promise<string> {

        const { name, email, password, role } = input;

        if (!name || !email || !password || !role) {
            throw new CustomError(
                400, 'Fill in the fields "name", "email", "password" and "role"'
            );
        }

        if (name.length < 4) {
            throw new InvalidName();
        }

        if (!email.includes("@")) {
            throw new InvalidEmail();
        }

        if (role !== "NORMAL" && role !== "ADMIN") {
            throw new InvalidRole();
        }

        const id: string = idGenerator.generate();

        const hashPassword: string = await hashManager.hash(password);

        await userDatabase.createUser(id, email, name, hashPassword, role);

        const accessToken = authenticator.generateToken( id, role );

        return accessToken;
    }

    async login(input: UserInputDTO) {

        const { email, password } = input;

        if (!email || !password) {
            throw new CustomError(400, 'Fill in the fields "name", "email", "password" and "role"');
        }

        if (!email.includes("@")) {
            throw new InvalidEmail();
        }

        const user = await userDatabase.findUser(email);

        if (!user) {
            throw new UserNotFound();
        }

        const isValidPassword: boolean = await hashManager.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            throw new InvalidPassword();
        }

        const token = authenticator.generateToken(user.id, user.role);

        return token;
    } catch(error: any) {
        throw new CustomError(400, error.message);
    }
};

