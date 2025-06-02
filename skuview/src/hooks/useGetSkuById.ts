import { AxiosService } from "@/service/AxiosInstance";
import { skuService } from "@/service/SkuService";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = AxiosService();
const skuSvc = skuService(axiosInstance);

const useGetSkuById = (skuId: string, options = {}) => {
    const query = useQuery({
      queryKey: ['sku'],
      queryFn: () => skuSvc.getSkuById(skuId),
      ...options
    });

    return query;
};

export default useGetSkuById;