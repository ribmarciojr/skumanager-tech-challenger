import { SkuStatusEnum } from "../enum/SkuStatusEnum";

export class SkuStatusType {
    private _id: number;
    private _status: SkuStatusEnum;

    constructor(id: number, status: SkuStatusEnum) {
        this._id = id;
        this._status = status;
    }

    get id(): number {
        return this._id;
    }
    get status(): SkuStatusEnum {
        return this._status;
    }
}