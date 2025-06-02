import { SkuStatusEnum } from "../enum/SkuStatusEnum";


export interface SkuState {
    getStatus(): SkuStatusEnum;
    canEditFields(): string[];
    transitionTo(newStatus: SkuStatusEnum): SkuState;
    canTransitionTo(): SkuStatusEnum[];
}
