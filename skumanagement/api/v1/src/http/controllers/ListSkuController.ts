import { Request, Response } from 'express';
import { ListSkusUseCase } from '../../application/usecases/list-sku/list-sku';
import { SkuStatusEnum } from '../../domain/enum/SkuStatusEnum';
import HttpStatusCode from '../enum/HttpStatusCode';
import { InvalidPageException, InvalidPageSizeException, InvalidStatusException } from '../errors/ValidationException';
import { SkuStatusMapper } from '../../infra/mappers/SkuStatusMapper';


export class ListSkuController {

  constructor(private readonly listSkuUseCase: ListSkusUseCase) { }

  async listSkus(req: Request, res: Response) {
    const firstPage = 1;
    const minPageSize = 5;
    const pageSizeValues = [5, 10, 20];

    const page = parseInt(req.query.page as string) || firstPage;
    const pageSize = parseInt(req.query.pageSize as string) || minPageSize;
    let status = req.query.status as string;

    const isInvalidStatus = status && !Object.values(SkuStatusEnum).includes(status as SkuStatusEnum);

    if (isInvalidStatus) {
      throw new InvalidStatusException();
    }

    if (page < 1) {
      throw new InvalidPageException();
    }

    if (!pageSizeValues.includes(pageSize)) {
      throw new InvalidPageSizeException();
    }

    try {
      const result = await this.listSkuUseCase.execute({ page, pageSize, status});
      
      return res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao listar SKUs' });
    }
  }

  async listSkusStatusValues(req: Request, res: Response) {
    try {
      const skuStatusValues = Object.values(SkuStatusEnum);

      return res.status(200).json(skuStatusValues);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao listar valores de status de SKU' });
    }
  }
}