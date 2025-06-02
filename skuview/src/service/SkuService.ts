import ISkuPage from '@/interfaces/ISkuPage';
import { AxiosInstance } from 'axios';

export interface UpdateSkuParams {
    descricaoComercial?: string,
    descricao?: string, 
    sku?: string, 
    status?: string
}

export function skuService(
    httpClient: AxiosInstance
) {

    return {
        createSku: async (descricao: string, descricaoComercial: string, sku: string): Promise<any> => {
            try {
                const response = await httpClient.post('/sku', {
                    descricao,
                    descricaoComercial,
                    sku
                });
                
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Erro ao criar SKU.';
                throw new Error(errorMessage);
            }
        },
        getPageSku: async (page: number, size: number, status: string): Promise<ISkuPage> => {
            try {
                const response = await httpClient.get('/sku/all', {
                    params: {
                        page,
                        pageSize: size,
                        status
                    }
                });
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Erro ao buscar SKUs.';
                throw new Error(errorMessage);
            }
        },
        getAvailableStatus: async (): Promise<string[]> => {
            try {
                const response = await httpClient.get('/sku/status');
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Erro ao buscar status disponíveis.';
                throw new Error(errorMessage);
            }
        },
        getSkuById: async (skuId: string): Promise<ISku> => {
            try {
                const response = await httpClient.get(`/sku/${skuId}`);
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Erro ao buscar status disponíveis.';
                throw new Error(errorMessage);
            }
        }, 
        updateSkuById: async (skuId: string, updateParams: UpdateSkuParams) => {
            try {
                console.log(`/sku/${skuId}`, updateParams)
                const response = await httpClient.put(`/sku/${skuId}`, updateParams);
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || `Erro ao atualizar sku ${skuId}.`;
                throw new Error(errorMessage);
            }
        }
    }
}