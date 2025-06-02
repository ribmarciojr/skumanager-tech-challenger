import { SkuStatusEnum } from "../enum/SkuStatusEnum";

export interface UpdateSkuParams {
    skuId: number;
    askedStatus: SkuStatusEnum;
    newSku?: string | null;
    descricao?: string | null;
    descricaoComercial?: string | null;
};