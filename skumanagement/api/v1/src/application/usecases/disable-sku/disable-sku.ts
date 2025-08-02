import { SkuStatusEnum } from "../../../domain/enum/SkuStatusEnum";
import { UnprocessableEntity } from "../../../domain/errors/UnprocessableEntity";
import { UpdateSkuStatusUseCase } from "../../../domain/interfaces/UpdateSkuStatusUseCase";
import { ISkuRepository } from "../../../domain/repositories/skuRepositoryInterface";
import { SkuStateMachine } from "../../../domain/states/SkuStateMachine";
import { SkuStatusMapper } from "../../../infra/mappers/SkuStatusMapper";
import { SkuStatusEnum as PrismaStatusEnum } from "@prisma/client";

export class DisableSkuUseCase implements UpdateSkuStatusUseCase {
  constructor(private readonly skuRepository: ISkuRepository) {}

  async execute(skuId: number, status: string): Promise<void> {
    const sku = await this.skuRepository.findById(skuId);

    if (!sku) {
      throw new UnprocessableEntity("SKU not found.");
    }

    const domainStatus = SkuStatusMapper.toDomain(
      sku.status?.status as PrismaStatusEnum
    );

    const skuStateMachine = new SkuStateMachine(domainStatus);

    skuStateMachine.transitionTo(SkuStatusEnum.DISABLED);

    await this.skuRepository.updateStatus({
      skuId,
      askedStatus: SkuStatusEnum.DISABLED,
    });
  }
}
