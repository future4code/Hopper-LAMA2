import * as jwt from "jsonwebtoken";
import { AuthenticationData, Role } from "../model/User";

export class Authenticator {
  public generateToken ( id: string, role: Role) {
    const token = jwt.sign(
      { id, role },
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
     return { 
      id: payload.id as string,
      role: Role[payload.role as keyof typeof Role],
    } ;
  }
};

