import { DuplicatedValueException } from "../../../domain/errors/DuplicatedValue";
import { ILogger } from "../../../domain/interfaces/ILogger";
import { ISkuRepository } from "../../../domain/repositories/skuRepositoryInterface";


export class CreateSkuUseCase {
  constructor(
    private readonly skuRepository: ISkuRepository,
    private readonly logger: ILogger
  ) { }

  async execute(descricaoComercial: string, sku: string, descricao: string): Promise<void> {
    this.logger.info(`Iniciando criação de SKU: ${sku}`);


    const existingSku = await this.skuRepository.findBySku(sku);

    if (existingSku) {
      this.logger.warn(`O SKU ${sku} já está cadastrado.`);
      throw new DuplicatedValueException(`SKU já cadastrado.`);
    }

    await this.skuRepository.create(descricaoComercial, sku, descricao);
    this.logger.info(`SKU ${sku} criado com sucesso.`);
  }
}
