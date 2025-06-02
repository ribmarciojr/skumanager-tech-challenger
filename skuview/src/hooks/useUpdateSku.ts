import { showToast } from '@/components/ToastNotification/ToastNotification';
import { AxiosService } from '@/service/AxiosInstance';
import { skuService, UpdateSkuParams } from '@/service/SkuService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const axiosInstance = AxiosService();
const skuSvc = skuService(axiosInstance);

export const useUpdateSkuById = (
    skuId?: string,
    options: { enabled?: boolean } = {}
  ) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ skuId, updateParams }: { skuId: string; updateParams: UpdateSkuParams }) => {
        console.log(skuId)
        console.log(updateParams)
        return await skuSvc.updateSkuById(skuId, updateParams);
      },
      onSuccess: (response, variables) => {
        showToast(response.message, 'success');
        queryClient.invalidateQueries({ queryKey: ['sku', variables.skuId] });
        queryClient.invalidateQueries({ queryKey: ['skus'] });
      },
      onError: (error: unknown) => {
        const message = error instanceof Error ? error.message : 'Erro ao atualizar o SKU.';
        showToast(message, 'error');
      },
      ...options,
    });
  };