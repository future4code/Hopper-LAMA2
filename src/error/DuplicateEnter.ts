import { BaseError } from "./BaseError";

export class DuplicateEnter extends BaseError {
    constructor(){
        super(409, "Já existe uma entrada igual")
    }
};










