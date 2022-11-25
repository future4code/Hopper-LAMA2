import { BaseError } from "./BaseError";

export class ShowTime extends BaseError {
    constructor(){
        super(400, "Time provided isn't between 8am and 11pm hours")
    }
};

