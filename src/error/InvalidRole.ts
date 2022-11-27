import { BaseError } from "./BaseError";

export class InvalidRole extends BaseError {
    constructor() {
      super(400, "invalid role");
    }
  }