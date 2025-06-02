import { ISkuData } from "@/interfaces/ISkuData";


export const isEditMode = (skuIdParam?: number | undefined) => {
    return !!skuIdParam;
};

export const populateFormFromSku = (sku: ISku): ISkuData => {
    return {
        sku: sku.sku || '',
        descricao: sku.descricao || '',
        descricaoComercial: sku.descricaoComercial || '',
        status: sku.status.status
    };
};

export const validateForm = (
    form: ISkuData,
    canEditFields: string[]
): Record<keyof ISkuData, boolean> => {
    const errors = {
        sku: false,
        descricao: false,
        descricaoComercial: false,
        status: false
    };

    if (canEditFields.includes("sku") && (!form.sku || form.sku.trim() === '')) {
        errors.sku = true;
    }

    if (canEditFields.includes("descricaoComercial") && (!form.descricaoComercial || form.descricaoComercial.trim() === '')) {
        errors.descricaoComercial = true;
    }

    if (canEditFields.includes("descricao") && (!form.descricao || form.descricao.trim() === '')) {
        errors.descricao = true;
    }

    return errors;
};

export const canEditField = (
    field: keyof ISkuData,
    editMode: boolean,
    canEditFields: string[] = []
): boolean => {
    if (!editMode) return true;

    return canEditFields.includes(field);
};