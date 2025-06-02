import { SkuEntity } from "@prisma/client";
import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { SkuState } from "../interfaces/SkuState";
import { CanceledState } from "./CanceledState";
import { CompleteRegisterState } from "./CompleteRegisterState";


export class PreRegisterState implements SkuState {
    getStatus(): SkuStatusEnum {
        return SkuStatusEnum.PRE_REGISTER;
    }

    canEditFields(): (keyof SkuEntity)[] {
        return ["descricao", "descricaoComercial", "sku"];
    }

    transitionTo(newStatus: SkuStatusEnum): SkuState {
        switch (newStatus) {
            case SkuStatusEnum.COMPLETE_REGISTER:
                return new CompleteRegisterState();
            case SkuStatusEnum.CANCELED:
                return new CanceledState();
            case SkuStatusEnum.PRE_REGISTER:
                return new PreRegisterState();
            default:
                throw new Error(`Transição inválida de PRE_REGISTER para ${newStatus}`);
        }
    }

    canTransitionTo(): SkuStatusEnum[] {
        return [SkuStatusEnum.COMPLETE_REGISTER, SkuStatusEnum.CANCELED]
    }
}
