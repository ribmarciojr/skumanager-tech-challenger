import { Request, Response, NextFunction } from "express";
import { BaseException } from "./BaseException";


export function globalExceptionHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err instanceof BaseException) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    } else {
        console.error("Unhandled error:", err);

        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}