import { SkuStatusEnum } from "../../../domain/enum/SkuStatusEnum";
import { InvalidProcessException } from "../../../domain/errors/InvalidProcessException";
import { UnprocessableEntity } from "../../../domain/errors/UnprocessableEntity";
import { ISkuRepository } from "../../../domain/repositories/skuRepositoryInterface";
import { SkuStateMachine } from "../../../domain/states/SkuStateMachine";

export class CompleteSkuRegistrationUseCase {
    constructor(
        private readonly skuRepository: ISkuRepository,
    ) { }

    async execute(skuId: number, description: string): Promise<void> {
        const existingSku = await this.skuRepository.findById(skuId);

        if (!existingSku) {
            throw new UnprocessableEntity("SKU not found.");
        }
        // @ts-ignore
        const skuStateMachine = new SkuStateMachine(existingSku.status.status);
  
        const availableFields = skuStateMachine.getAvailableFields();
        
        if (!availableFields.includes("descricao")) {
            throw new InvalidProcessException("Modify SKU description is not allowed in the current state.");
        }

        skuStateMachine.transitionTo(SkuStatusEnum.COMPLETE_REGISTER);

        await this.skuRepository.update(skuId, description);
    }
}       