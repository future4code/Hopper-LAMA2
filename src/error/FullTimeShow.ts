import { BaseError } from "./BaseError";

export class FullTimeShow extends BaseError {
    constructor(){
        super(400, "Shows can only be booked at round times")
    }
};




