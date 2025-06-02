import { SkuStatusEnum } from "../enum/SkuStatusEnum";
import { SkuState } from "../interfaces/SkuState";


export class CanceledState implements SkuState {
    getStatus(): SkuStatusEnum {
        return SkuStatusEnum.CANCELED;
    }

    canEditFields(): string[] {
        return [];
    }

    transitionTo(_: SkuStatusEnum): SkuState {
        switch(_){
            case SkuStatusEnum.CANCELED:
                return new CanceledState();
            default:
                throw new Error(`CANCELED é um estado final e não permite transições`);
        }
    }

    canTransitionTo(): SkuStatusEnum[] {
        return []
    }
}