import { BaseError } from "./BaseError";

export class BandNotFound extends BaseError {
    constructor(){
        super(400, "Band not found")
    }
};

