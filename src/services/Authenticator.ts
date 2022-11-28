
import * as jwt from "jsonwebtoken";
import { AuthenticationData, UserRole } from "../model/User";

export class Authenticator {
  public generateToken ( id: string, role: UserRole) {
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
      role: UserRole[payload.role as keyof typeof UserRole],
    } ;
  }
};


