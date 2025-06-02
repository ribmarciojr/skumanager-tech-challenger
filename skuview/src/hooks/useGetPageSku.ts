import { AxiosService } from '@/service/AxiosInstance';
import { skuService } from '@/service/SkuService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const axiosInstance = AxiosService();
const skuSvc = skuService(axiosInstance);

const useSkus = (page = 1, size = 5, status = 'ACTIVE') => {
    const queryClient = useQueryClient();
    const nextPage = page + 1;
  
    const query = useQuery({
      queryKey: ['skus', page, size, status],
      queryFn: () => skuSvc.getPageSku(page, size, status),
    });

    queryClient.prefetchQuery({
      queryKey: ['skus', nextPage, size, status],
      queryFn: () => skuSvc.getPageSku(nextPage, size, status),
    });

    return query;
  };

export default useSkus;