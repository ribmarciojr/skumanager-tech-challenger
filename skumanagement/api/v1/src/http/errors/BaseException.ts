export class BaseException extends Error {
    public readonly statusCode: number;
    public readonly message!: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
