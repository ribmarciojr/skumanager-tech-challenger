import { Request, Response } from "express";
import { CreateSkuUseCase } from "../../application/usecases/create-sku/create-sku";
import { ValidationException } from "../errors/ValidationException";
import HttpStatusCode from "../enum/HttpStatusCode";
import { ICreateSkuController } from "../interface/ICreateSkuController";
import { ILogger } from "../../domain/interfaces/ILogger";

export default class CreateSkuController {
    constructor(
        private readonly createSkuUseCase: CreateSkuUseCase,
        private readonly logger: ILogger
    ) { }

    async create(req: Request, res: Response): Promise<void> {
        const { descricaoComercial, sku, descricao } = req.body;

        this.logger.info('Recebida requisição para criação de SKU', {
            payload: { descricaoComercial, sku },
        });

        if (!descricaoComercial || !sku) {
            this.logger.warn('Campos obrigatórios ausentes na requisição', {
                descricaoComercial,
                sku,
            });
            throw new ValidationException('Descrição Comercial e SKU', 'são obrigatórios');
        }

        if (typeof descricaoComercial !== 'string' || descricaoComercial.trim() === '') {
            this.logger.warn('Descrição comercial inválida: string vazia ou nula');
            throw new ValidationException('Descrição Comercial', 'deve ser uma string não vazia');
        }

        if (descricaoComercial.length < 3 || descricaoComercial.length > 255) {
            this.logger.warn('Descrição comercial com tamanho inválido', {
                descricaoComercial,
            });
            throw new ValidationException(
                'Descrição Comercial',
                'deve ter entre 3 e 255 caracteres'
            );
        }

        if (typeof sku !== 'string' || isNaN(parseInt(sku))) {
            this.logger.warn('SKU inválido: não é um número válido', { sku });
            throw new ValidationException('SKU', 'deve conter um número válido');
        }

        if (parseInt(sku) < 0) {
            this.logger.warn('SKU inválido: número negativo', { sku });
            throw new ValidationException('SKU', 'deve ser um número positivo');
        }

        const digits = sku.trim().length;
        if (digits < 5 || digits > 10) {
            this.logger.warn('SKU com quantidade de dígitos inválida', { sku });
            throw new ValidationException('SKU', 'deve conter entre 5 e 10 dígitos');
        }


        await this.createSkuUseCase.execute(descricaoComercial, sku, descricao);

        this.logger.info('SKU criado com sucesso', { descricaoComercial, sku });
        res.status(HttpStatusCode.CREATED).send({ message: 'SKU criado com sucesso' });
    }
}

