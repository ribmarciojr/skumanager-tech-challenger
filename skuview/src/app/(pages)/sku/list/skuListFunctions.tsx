'use client'

import { showToast } from "@/components/ToastNotification/ToastNotification";
import { SkuStatusEnum } from "@/enums/SkuStatusEnum";
import useSkus from "@/hooks/useGetPageSku";
import { ISkuItemList } from "@/interfaces/ISkuPage";
import queryClient from "@/utils/queryClient";
import { SkuStatusMapper } from "@/utils/skuStatusMapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SkuListFunctions() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterStatus, setFilterStatus] = useState(SkuStatusEnum.PRE_REGISTER.valueOf());
    const { data, isLoading, refetch,  } = useSkus(currentPage + 1, rowsPerPage, filterStatus);
    
    const router = useRouter()
    
    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);

        setRowsPerPage(newRowsPerPage);
        refetch();
        setCurrentPage(0);
    };
    
    const onChangeFilter = (status: string) => {
        setFilterStatus(status);
        refetch();
        setCurrentPage(0);
    }

    const handleSkuEdit = (sku: ISkuItemList) => {
        router.push(`/sku/register?skuId=${sku.id}`)
    }

    return {
        data,
        currentPage,
        rowsPerPage,
        router,
        isLoading,
        filterStatus,
        setCurrentPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        onChangeFilter,
        handleSkuEdit
    };
}