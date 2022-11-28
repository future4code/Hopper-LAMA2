import { BaseError } from "./BaseError";

export class InvalidPassword extends BaseError {
    constructor() {
      super(400, "Invalid Password");
    }
  }