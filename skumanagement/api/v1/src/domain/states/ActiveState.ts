import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { SkuState } from "../interfaces/SkuState";
import { DisabledState } from "./DisabledState";

export class ActiveState implements SkuState {
    getStatus(): SkuStatusEnum {
        return SkuStatusEnum.ACTIVE;
    }

    canEditFields(): string[] {
        return [];
    }

    transitionTo(newStatus: SkuStatusEnum): SkuState {
        switch (newStatus) {
            case SkuStatusEnum.DISABLED:
                return new DisabledState();
            case SkuStatusEnum.ACTIVE:
                return new ActiveState();
            default:
                throw new Error(`Transição inválida de ACTIVE para ${newStatus}`);
        }
    }

    canTransitionTo(): SkuStatusEnum[] {
        return [SkuStatusEnum.DISABLED]
    }
}
