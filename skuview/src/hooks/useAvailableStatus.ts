import { AxiosService } from "@/service/AxiosInstance";
import { skuService } from "@/service/SkuService";
import { useQueries, useQuery } from "@tanstack/react-query";

const axiosInstance = AxiosService();
const skuSvc = skuService(axiosInstance);

const useAvailableStatus = () => {
  return useQuery({
    queryKey: ["availableStatus"],
    queryFn: () => skuSvc.getAvailableStatus(),
    staleTime: 1000 * 60 * 5,
  });
};

export default useAvailableStatus;