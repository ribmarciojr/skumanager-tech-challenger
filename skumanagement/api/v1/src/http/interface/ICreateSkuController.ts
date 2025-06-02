import { Request, Response } from "express";

export interface ICreateSkuController {
    create(req: Request, res: Response): Promise<void>;
}


