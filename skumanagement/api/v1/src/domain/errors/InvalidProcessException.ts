import HttpStatusCode from "../../http/enum/HttpStatusCode";
import { BaseException } from "../../http/errors/BaseException";

export class InvalidProcessException extends BaseException {
    constructor(
        public message: string,
    ) {
        super(message, HttpStatusCode.BAD_REQUEST);
    }
}