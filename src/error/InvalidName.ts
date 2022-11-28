import { BaseError } from "./BaseError";

export class InvalidName extends BaseError {
    constructor() {
      super(400, "Invalid name");
    }
  }
