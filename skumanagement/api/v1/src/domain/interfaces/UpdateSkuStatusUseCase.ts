export interface UpdateSkuStatusUseCase {
  execute(skuId: number, status: string, descricao: string, descricaoComercial: string, newSku: string): Promise<void>;
}