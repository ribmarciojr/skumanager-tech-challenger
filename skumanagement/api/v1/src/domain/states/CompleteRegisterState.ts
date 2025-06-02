
import { SkuEntity } from "../entities/SkuEntity";
import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { SkuState } from "../interfaces/SkuState";
import { ActiveState } from "./ActiveState";
import { CanceledState } from "./CanceledState";
import { PreRegisterState } from "./PreRegisterState";

export class CompleteRegisterState implements SkuState {
    getStatus(): SkuStatusEnum {
        return SkuStatusEnum.COMPLETE_REGISTER;
    }

    canEditFields(): (keyof SkuEntity)[] {
        return ["descricaoComercial"];
    }

    transitionTo(newStatus: SkuStatusEnum): SkuState {
        switch (newStatus) {
            case SkuStatusEnum.PRE_REGISTER:
                return new PreRegisterState();
            case SkuStatusEnum.ACTIVE:
                return new ActiveState();
            case SkuStatusEnum.CANCELED:
                return new CanceledState();
            case SkuStatusEnum.COMPLETE_REGISTER:
                return new CompleteRegisterState()
            default:
                throw new Error(`Transição inválida de COMPLETE_REGISTER para ${newStatus}`);
        }
    }

    canTransitionTo(): SkuStatusEnum[] {
        return [SkuStatusEnum.PRE_REGISTER, SkuStatusEnum.ACTIVE, SkuStatusEnum.CANCELED]
    }
}
