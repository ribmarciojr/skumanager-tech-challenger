import { StatusDTO } from "./StatusDTO";

export type SkuDTO = {
    id: number,
    descricaoComercial: string,
    sku: string,
    status?: StatusDTO,
    descricao: string | null,
}