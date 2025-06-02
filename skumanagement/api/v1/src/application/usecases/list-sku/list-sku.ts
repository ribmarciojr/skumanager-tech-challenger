import { SkuEntity } from '@prisma/client';
import { ISkuRepository } from '../../../domain/repositories/skuRepositoryInterface';
import { SkuListItemDTO } from '../../dto/SkuListItemDTO';
import { SkuStatusEnum } from '../../../domain/enum/SkuStatusEnum';
import { SkuStatusMapper } from '../../../infra/mappers/SkuStatusMapper';

export interface ListSkusUseCaseParams {
  page: number;
  pageSize: number;
  status: string;
}

export interface ListSkusUseCaseResponse {
  total: number;
  page: number;
  pageSize: number;
  data: SkuListItemDTO[];
}

export class ListSkusUseCase {
  constructor(private readonly skuRepository: ISkuRepository) { }

  async execute({ page, pageSize, status}: ListSkusUseCaseParams): Promise<ListSkusUseCaseResponse> {
    
    const skuStatus = SkuStatusMapper.mapToEnum(status) as SkuStatusEnum;
    const { skus, total } = await this.skuRepository.getPage({
      page,
      pageSize,
      skuStatus,
    });

    return {
      total,
      page,
      pageSize,
      data: skus,
    };
  }
}
