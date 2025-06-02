export type ISkuItemList = {
    sku: string;
    descricao: string;
    descricaoComercial: string;
    status: string;
    id: number;
    statusId: number;
} 

export default interface ISkuPage {
    total: number;
    page: number;
    pageSize: number;
    data: ISkuItemList[];
}
