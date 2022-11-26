import { BaseError } from "./BaseError";

export class CustomError extends BaseError {
    constructor(code: any, message: any) {
        super(code, message);
    }
};