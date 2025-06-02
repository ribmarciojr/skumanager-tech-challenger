import HttpStatusCode from "../enum/HttpStatusCode";
import { BaseException } from "./BaseException";

export class ValidationException extends BaseException {
  constructor(field: string, message: string) {
    super(`${field}: ${message}`, HttpStatusCode.BAD_REQUEST);
  }
}

export class InvalidPageException extends BaseException {
  constructor(message: string = 'O parâmetro "page" deve ser um número inteiro maior ou igual a 1.') {
      super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class InvalidPageSizeException extends BaseException {
  constructor(message: string = 'O parâmetro "pageSize" deve ser um dos seguintes valores: 5, 10 ou 20.') {
      super(message, HttpStatusCode.BAD_REQUEST);
  }
}``


export class InvalidStatusException extends BaseException {
  constructor(message: string = 'O valor do parâmetro "status" nao existe.') {
      super(message, HttpStatusCode.BAD_REQUEST);
  }
}