import { LoginInputDTO, user, UserInputDTO, UserRole } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";
import { InvalidName } from "../error/InvalidName";
import { InvalidEmail } from "../error/InvalidEmail";
import { InvalidRole } from "../error/InvalidRole";
import { UserNotFound } from "../error/UserNotFound";
import { InvalidPassword } from "../error/InvalidPassword";

export class UserBusiness {
    constructor(
        private readonly idGenerator: IdGenerator,
        private readonly authenticator: Authenticator,
        private readonly hashManager: HashManager,
        private readonly userDatabase: UserDatabase,
    ) { }

    public createUser = async (input: UserInputDTO)/*: Promise<string>*/ => {
        try {
            const { name, email, password } = input;
            let role = input.role;

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

            const id: string = this.idGenerator.generate();

            const hashPassword: string = await this.hashManager.hash(password);

            const user: user = {
                id,
                name,
                email,
                password: hashPassword,
                role: UserRole[role as keyof typeof UserRole]
            };

            await this.userDatabase.createUser(user);
            const accessToken = this.authenticator.generateToken(id, user.role);

            return accessToken;

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        }
    }

    public login = async (input: LoginInputDTO)/*: Promise<string>*/ => {
        try {
            const { email, password } = input;

            if (!email || !password) {
                throw new CustomError(400, 'Fill in the fields "name", "email", "password" and "role"');
            }

            if (!email.includes("@")) {
                throw new InvalidEmail();
            }

            const user = await this.userDatabase.findUser(email);

            if (!user) {
                throw new UserNotFound();
            }

            const isValidPassword: boolean = await this.hashManager.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                throw new InvalidPassword();
            }

            const token = this.authenticator.generateToken(user.id, user.role);

            return token;

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message);
            }
        }

    }
};

