import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../model/User";

export class Authenticator {
  public generateToken({ id }: AuthenticationData): string {
    const token = jwt.sign(
      { id },
      process.env.JWT_KEY as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    )
    return token;
  };

  public getTokenData(token: string): AuthenticationData {
    const payload = jwt.verify(
      token, 
      process.env.JWT_KEY as string
      ) as AuthenticationData;
     return { id: payload.id } ;
  }
};
