import HttpStatusCode from "../../http/enum/HttpStatusCode";
import { BaseException } from "../../http/errors/BaseException";


export class DuplicatedValueException extends BaseException {
    constructor(message: string) {
        super(message, HttpStatusCode.CONFLICT);
    }
}