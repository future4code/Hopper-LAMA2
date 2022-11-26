import { BaseError } from "./BaseError";

export class ShowNotFound extends BaseError {
    constructor(){
        super(400, "Show not found")
    }
};




