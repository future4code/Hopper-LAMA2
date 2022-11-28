import { BaseError } from "./BaseError";

export class InvalidEmail extends BaseError {
    constructor() {
      super(400, "Invalid email");
    }
  }