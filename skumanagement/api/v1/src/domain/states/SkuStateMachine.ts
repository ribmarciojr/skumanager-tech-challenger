import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { SkuState } from "../interfaces/SkuState";
import { ActiveState } from "./ActiveState";
import { CanceledState } from "./CanceledState";
import { CompleteRegisterState } from "./CompleteRegisterState";
import { DisabledState } from "./DisabledState";
import { PreRegisterState } from "./PreRegisterState";


export class SkuStateMachine {
    private state: SkuState;

    constructor(status: SkuStatusEnum) {
        this.state = this.buildState(status);
    }

    private buildState(status: SkuStatusEnum): SkuState {
        switch (status) {
            case SkuStatusEnum.PRE_REGISTER:
                return new PreRegisterState();
            case SkuStatusEnum.COMPLETE_REGISTER:
                return new CompleteRegisterState();
            case SkuStatusEnum.ACTIVE:
                return new ActiveState();
            case SkuStatusEnum.DISABLED:
                return new DisabledState();
            case SkuStatusEnum.CANCELED:
                return new CanceledState();
            default:
                throw new Error(`Estado inválido: ${status}`);
        }
    }

    getAvailableFields(): string[] {
        return this.state.canEditFields();
    }

    getCurrentStatus(): SkuStatusEnum {
        return this.state.getStatus();
    }

    transitionTo(newStatus: SkuStatusEnum): void {
        this.state = this.state.transitionTo(newStatus);
    }

    canTransitionTo(): Array<SkuStatusEnum> {
        return this.state.canTransitionTo();
    }
}
