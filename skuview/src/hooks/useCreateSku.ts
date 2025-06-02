import { showToast } from "@/components/ToastNotification/ToastNotification";
import { ISkuData } from "@/interfaces/ISkuData";
import { AxiosService } from "@/service/AxiosInstance";
import { skuService } from "@/service/SkuService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const axiosInstance = AxiosService();
const skuSvc = skuService(axiosInstance);


const useCreateSku = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, isSuccess, error } = useMutation<any, Error, ISkuData>({
        mutationFn: (data: ISkuData) => skuSvc.createSku(data.descricao, data.descricaoComercial, data.sku),
        onSuccess: (response) => {
            showToast(response.message, "success")
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
        onError: (error) => {
            showToast(error.message, "error");
        },
    }
    );

    return {
        createSku: mutate,
        isPending,
        isError,
        isSuccess,
        error
    };
};

export default useCreateSku;