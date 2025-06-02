import { SkuStatusType } from "@prisma/client";
import { SkuStatusEnum } from "../enum/SkuStatusEnum";

export class SkuEntity {
    private _id: number;
    private _descricao: string | null;
    private _descricaoComercial: string;
    private _sku: string;
    private _status: SkuStatusType; 

    constructor(id: number, descricao: string | null, descricaoComercial: string, sku: string, status: SkuStatusType) {
        this._id = id;
        this._descricao = descricao;
        this._descricaoComercial = descricaoComercial;
        this._sku = sku;
        this._status = status;
    }
    
    get id(): number {
        return this._id;
    }

    get descricao(): string | null {
        return this._descricao;
    }

    get descricaoComercial(): string {
        return this._descricaoComercial;
    }

    get sku(): string {
        return this._sku;
    }

    get status(): SkuStatusType {
        return this._status;
    }
    
    public updateDescricao(descricao: string): void {
        this._descricao = descricao;
    }

    public updateDescricaoComercial(descricaoComercial: string): void {
        this._descricaoComercial = descricaoComercial;
    }

    public updateSku(sku: string): void {
        this._sku = sku;
    }

    public toObject(): object {
        return {
            id: this._id,
            descricao: this._descricao,
            descricaoComercial: this._descricaoComercial,
            sku: this._sku
        };
    }
}