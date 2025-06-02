import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { SkuState } from "../interfaces/SkuState";
import { ActiveState } from "./ActiveState";
import { PreRegisterState } from "./PreRegisterState";

export class DisabledState implements SkuState {
    getStatus(): SkuStatusEnum {
        return SkuStatusEnum.DISABLED;
    }

    canEditFields(): string[] {
        return [];
    }

    transitionTo(newStatus: SkuStatusEnum): SkuState {
        switch (newStatus) {
            case SkuStatusEnum.ACTIVE:
                return new ActiveState();
            case SkuStatusEnum.PRE_REGISTER:
                return new PreRegisterState();
            case SkuStatusEnum.DISABLED:
                return new DisabledState();
            default:
                throw new Error(`Transição inválida de DISABLED para ${newStatus}`);
        }
    }

    canTransitionTo(): SkuStatusEnum[] {
        return [SkuStatusEnum.ACTIVE, SkuStatusEnum.PRE_REGISTER]
    }
}
