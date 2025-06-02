import { SkuStatusEnum } from "../../../domain/enum/SkuStatusEnum";
import { DuplicatedValueException } from "../../../domain/errors/DuplicatedValue";
import { InvalidProcessException } from "../../../domain/errors/InvalidProcessException";
import { NotFoundException } from "../../../domain/errors/NotFoundException";
import { UnprocessableEntity } from "../../../domain/errors/UnprocessableEntity";
import { UpdateSkuParams } from "../../../domain/interfaces/IUpdateSkuParams";
import { ISkuRepository } from "../../../domain/repositories/skuRepositoryInterface";
import { SkuStateMachine } from "../../../domain/states/SkuStateMachine";
import { SkuStatusMapper } from "../../../infra/mappers/SkuStatusMapper";

export class UpdateSkuStatusUseCase {
    constructor(private readonly skuRepository: ISkuRepository) { }

    async execute(skuId: number, status: string, descricao: string, descricaoComercial: string, newSku: string): Promise<void> {
        const sku = await this.skuRepository.findById(skuId);

        if (!sku) {
            throw new UnprocessableEntity("SKU not found.");
        }

        if (!sku.status) {
            throw new NotFoundException("Sku sem status cadastrado.")
        }

        if (newSku && newSku != sku.sku) {
            const hasSku = await this.skuRepository.findBySku(newSku)

            if (hasSku) {
                throw new DuplicatedValueException(`O sku: ${newSku} já está em uso!`)
            }

        }

        const currentStatus = SkuStatusMapper.keyStringToEnum(sku.status.status);

        const skuStateMachine = new SkuStateMachine(currentStatus);

        const askedStatus = SkuStatusMapper.fromValue(status);

        const availableFields = skuStateMachine.getAvailableFields()

        if (newSku && newSku != sku.sku && !availableFields.find((field) => field === "sku")) {
            throw new UnprocessableEntity("Voce nao pode editar o sku nesse status!")
        }

        if (descricao && descricao != sku.descricao && !availableFields.find((field) => field === "descricao")) {
            throw new UnprocessableEntity("Voce nao pode editar a descricao nesse status!")
        }

        if (descricaoComercial && descricaoComercial != sku.descricaoComercial && !availableFields.find((field) => field === "descricaoComercial")) {
            throw new UnprocessableEntity("Voce nao pode editar a descricao comercial nesse status!")
        }

        try {
            skuStateMachine.transitionTo(askedStatus);
            await this.skuRepository.updateStatus({ skuId, askedStatus, newSku, descricao, descricaoComercial });

        } catch (error) {
            if (error instanceof Error) {

                throw new InvalidProcessException(
                    `${askedStatus}: ${error?.message as string}`
                );
            }
            console.error("Unexpected error:", error);
        }
    }
}