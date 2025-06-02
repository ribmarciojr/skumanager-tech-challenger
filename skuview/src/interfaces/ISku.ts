interface ISkuStatus {
    id: number;
    status: string;
}

interface ISku {
    id: number;
    descricaoComercial: string;
    sku: string;
    status: ISkuStatus;
    descricao: string | null;
    canEditFields: string[];
    canTransitionTo?: string[]
}