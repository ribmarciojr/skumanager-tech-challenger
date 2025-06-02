import { ILogger } from "../../../domain/interfaces/ILogger";
import { ISkuRepository } from "../../../domain/repositories/skuRepositoryInterface";
import { NotFoundException } from "../../../domain/errors/NotFoundException";
import { SkuDTO } from "../../dto/SkuDTO";

export class GetSkuByIdUseCase {
    constructor(
      private readonly skuRepository: ISkuRepository,
      private readonly logger: ILogger
    ) { }
  
    async execute(id: number): Promise<SkuDTO> {
      this.logger.info(`Iniciando busca de SKU pelo ID: ${id}`);
  
      const sku = await this.skuRepository.findById(id);
  
      if (!sku) {
        this.logger.warn(`SKU com ID ${id} não encontrado.`);
        throw new NotFoundException(`SKU não encontrado.`);
      }
  
      this.logger.info(`SKU com ID ${id} encontrado com sucesso.`);
      return sku;
    }
}