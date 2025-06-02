import HttpStatusCode from "../../http/enum/HttpStatusCode";
import { BaseException } from "../../http/errors/BaseException";

export class UnprocessableEntity extends BaseException {
    constructor(message: string) {
      super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
    }
}