import { SkuDTO } from "../../application/dto/SkuDTO";
import { SkuListItemDTO } from "../../application/dto/SkuListItemDTO";
import { SkuEntity } from "../entities/SkuEntity";
import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { UpdateSkuParams } from "../interfaces/IUpdateSkuParams";

export interface FindAllSkusParams {
    page: number;
    pageSize: number;
    skuStatus: SkuStatusEnum;
}

export interface FindAllSkusResult {
  skus: SkuListItemDTO[];
  total: number;
}

export interface ISkuRepository {
    create(descricaoComercial: string, sku: string, descricao: string): Promise<void>;
    findById(id: number): Promise<SkuDTO | null>;
    findBySku(sku: string): Promise<SkuEntity | null>;
    getPage(params: FindAllSkusParams): Promise<FindAllSkusResult>;
    update(id: number, descricao: string): Promise<void>;
    updateStatus(params: UpdateSkuParams): Promise<void>;
}