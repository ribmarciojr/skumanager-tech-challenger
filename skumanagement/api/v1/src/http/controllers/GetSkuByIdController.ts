import { Request, Response } from "express";
import { GetSkuByIdUseCase } from "../../application/usecases/get-sku-by-id/get-sku-by-id";
import { ILogger } from "../../domain/interfaces/ILogger";
import { ValidationException } from "../errors/ValidationException";
import HttpStatusCode from "../enum/HttpStatusCode";
import { NotFoundException } from "../../domain/errors/NotFoundException";
import { SkuStateMachine } from "../../domain/states/SkuStateMachine";
import { SkuStatusMapper } from "../../infra/mappers/SkuStatusMapper";

export class GetSkuByIdController {
    constructor(
        private getSkuByIdUseCase: GetSkuByIdUseCase,
        private logger: ILogger,
    ) {}

    async get(req: Request, res: Response) {
        const skuId = parseInt(req.params.id, 10);
        
        this.logger.info(`Recebendo requisição para buscar SKU com ID: ${skuId}`);

        if (isNaN(skuId) || skuId <= 0) {
            this.logger.warn(`ID do SKU inválido: ${skuId}`);
            throw new ValidationException("SkuId", "Invalid SKU ID provided.");
        }

        this.getSkuByIdUseCase.execute(skuId)
            .then((sku) => {
                this.logger.info(`SKU encontrado: ${sku.id}`);
                const skuCurrentStatus = sku.status?.status
                if (!skuCurrentStatus){
                    throw new NotFoundException(`Falha ao encontrar status do sku ${sku.status?.status}`)
                }
                
                const stateMachine = new SkuStateMachine(SkuStatusMapper.mapFromKey(skuCurrentStatus))

                res.status(HttpStatusCode.OK).send({
                    ...sku, 
                    "canEditFields": stateMachine.getAvailableFields(),
                    "canTransitionTo": stateMachine.canTransitionTo()
                });
            })
            .catch((error: unknown) => {
                if (error instanceof NotFoundException) {
                    this.logger.warn(`SKU com ID ${skuId} não encontrado.`);
                    res.status(HttpStatusCode.NOT_FOUND).send({ error: error.message });
                } else {
                    this.logger.error("Erro desconhecido ao buscar SKU.", error as Record<string, any>);
                    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: "Unknown error occurred" });
                }
            });
    }
}