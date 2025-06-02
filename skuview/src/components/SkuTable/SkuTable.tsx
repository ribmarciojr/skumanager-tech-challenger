'use client';

import React, { ChangeEvent } from 'react';
import GenericTable from './GenericTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SkuStatusEnum } from '@/enums/SkuStatusEnum';
import { SkuStatusMapper } from '@/utils/skuStatusMapper';
import { ISkuItemList } from '@/interfaces/ISkuPage';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Column {
    id: string;
    label: string;
}

interface Action {
    icon: React.ReactNode;
    onClick: (id: ISkuItemList) => void;
}

interface SkuTableProps {
    data: ISkuItemList[];
    skuStatusType: SkuStatusEnum;
    currentPage: number;
    rowsPerPage: number;
    totalElements: number;
    onEdit?: (sku: ISkuItemList) => void; 
    onView?: (sku: ISkuItemList) => void;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SkuTable: React.FC<SkuTableProps> = ({ 
    data, 
    currentPage, 
    rowsPerPage,
    totalElements, 
    skuStatusType,
    onEdit, 
    onView, 
    handleChangePage, 
    handleChangeRowsPerPage,
}) => {
    const columns: Column[] = [
        { id: 'sku', label: 'Sku' },
        { id: 'descricao', label: 'Descricao' },
        { id: 'descricaoComercial', label: 'Descricao Comercial' },
        { id: 'status', label: 'Status'},
    ];


    const actions: Action[] = [];

    if(onEdit) actions.push({icon: <EditIcon />, onClick: onEdit})

    if(onView) actions.push({icon: <VisibilityIcon />, onClick: onView})

    return (
        <GenericTable
            data={data}
            columns={columns}
            actions={actions}
            totalElements={totalElements}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}

        />
    );
};

export default SkuTable;