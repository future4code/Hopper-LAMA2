import { BaseError } from "./BaseError";

export class Unauthorized extends BaseError {
    constructor() {
      super(401, "Unauthorized user");
    }
  }