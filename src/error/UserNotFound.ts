import { BaseError } from "./BaseError";

export class UserNotFound extends BaseError {
    constructor() {
      super(404, "User not found");
    }
  }