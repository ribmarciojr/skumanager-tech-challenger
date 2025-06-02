import HttpStatusCode from "../../http/enum/HttpStatusCode";
import { BaseException } from "../../http/errors/BaseException";

export class NotFoundException extends BaseException{
    constructor(message: string) {
      super(message, HttpStatusCode.NOT_FOUND);
    }
}