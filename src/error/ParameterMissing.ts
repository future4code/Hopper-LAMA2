import { BaseError } from "./BaseError";

export class ParameterMissing extends BaseError {
    constructor(){
        super(412, "Some parameter is missing.")
    }
};




