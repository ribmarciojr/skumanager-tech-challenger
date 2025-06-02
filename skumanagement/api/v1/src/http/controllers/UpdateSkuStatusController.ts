import { Request, Response } from "express";
import { UpdateSkuStatusUseCase } from "../../domain/interfaces/UpdateSkuStatusUseCase";
import { ValidationException } from "../errors/ValidationException";
import HttpStatusCode from "../enum/HttpStatusCode";

export class UpdateSkuStatusController {
    constructor(private readonly updateSkuStatusUseCase: UpdateSkuStatusUseCase) { }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { status, descricao, descricaoComercial, sku } = req.body;

        if (!id || !status) {
            throw new ValidationException("id", "ID and status are required");
        }

        if (isNaN(Number(id))) {
            throw new ValidationException("id", "ID must be a number");
        }
        if (typeof status !== "string") {
            throw new ValidationException("status", "Status must be a string");
        }
        try {
            let newSku = sku
            await this.updateSkuStatusUseCase.execute(Number(id), status, descricao, descricaoComercial, newSku);

            res.status(HttpStatusCode.OK).json({ message: "SKU status updated successfully" });
        } catch(error) {
            if (error instanceof Error) {
                res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
            } else {
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        }
    }
}
