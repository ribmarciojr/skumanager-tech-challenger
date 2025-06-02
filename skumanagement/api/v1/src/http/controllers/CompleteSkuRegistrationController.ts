import { Request, Response } from "express";
import { CompleteSkuRegistrationUseCase } from "../../application/usecases/complete-sku-registration/complete-sku-registration";
import { ValidationException } from "../errors/ValidationException";
import HttpStatusCode from "../enum/HttpStatusCode";

export class CompleteSkuRegistrationController {
    constructor(private completeSkuRegistrationUseCase: CompleteSkuRegistrationUseCase) {}

    async complete(req: Request, res: Response) {
        const skuId = parseInt(req.params.id, 10);
        const { description } = req.body;

        const MAX_DESCRIPTION_LENGHT = 255;
        const MIN_DESCRIPTION_LENGHT = 3;

        if (isNaN(skuId) || skuId <= 0) {
            throw new ValidationException("SkuId","Invalid SKU ID provided.");
        }
        if (!description || typeof description !== "string" || description.trim() === "") {
            throw new ValidationException("Description", "Description is required and must be a string.");
        }

        if(description.length < MIN_DESCRIPTION_LENGHT || description.length > MAX_DESCRIPTION_LENGHT) {
            throw new ValidationException("Description", `Description must be between ${MIN_DESCRIPTION_LENGHT} and ${MAX_DESCRIPTION_LENGHT} characters long.`);
        }

        await this.completeSkuRegistrationUseCase.execute(skuId, description)
            .then(() => {
                res.status(HttpStatusCode.OK).send({ message: "SKU registration completed successfully." });
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    res.status(HttpStatusCode.BAD_REQUEST).send({ error: error.message });
                } else {
                    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: "Unknown error occurred" });
                }
            });
    }
}