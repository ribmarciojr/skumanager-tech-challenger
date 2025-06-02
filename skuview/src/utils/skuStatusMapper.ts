import { SkuStatusEnum } from "@/enums/SkuStatusEnum";

export class SkuStatusMapper {
    private static readonly labelMap: Record<SkuStatusEnum, string> = {
        [SkuStatusEnum.PRE_REGISTER]: 'Pré-registro',
        [SkuStatusEnum.COMPLETE_REGISTER]: 'Registro completo',
        [SkuStatusEnum.ACTIVE]: 'Ativo',
        [SkuStatusEnum.DISABLED]: 'Desativado',
        [SkuStatusEnum.CANCELED]: 'Cancelado',
    };

    private static readonly reverseLabelMap: Record<string, SkuStatusEnum> = Object.entries(
        SkuStatusMapper.labelMap
    ).reduce((acc, [enumValue, label]) => {
        acc[label] = enumValue as SkuStatusEnum;
        return acc;
    }, {} as Record<string, SkuStatusEnum>);

    static mapToEnum(status: string): SkuStatusEnum {
        const entry = Object.entries(SkuStatusEnum).find(
          ([, value]) => value === status
        );
      
        if (!entry) {
          throw new Error(`Invalid status string: '${status}'`);
        }
      
        return SkuStatusEnum[entry[0] as keyof typeof SkuStatusEnum];
      }
      

    static mapToString(status: SkuStatusEnum): string {

        if (!(status in SkuStatusEnum)) {
            throw new Error(`Invalid status enum: '${status}'`);
        }
        // @ts-ignore
        return SkuStatusEnum[status as keyof typeof SkuStatusEnum];
    }

    static mapToLabel(status: SkuStatusEnum): string {
        return this.labelMap[status] ?? 'Desconhecido';
    }

    static mapFromLabel(label: string): SkuStatusEnum {
        const status = this.reverseLabelMap[label];
        if (!status) {
            throw new Error(`Invalid status label: '${label}'`);
        }
        return status;
    }

    static mapStringToLabel(status: string): string {
        const enumValue = this.mapToEnum(status);
        return this.mapToLabel(enumValue);
    }

    static all(): { value: SkuStatusEnum; label: string }[] {
        return Object.values(SkuStatusEnum).map((value) => ({
            value,
            label: this.mapToLabel(value),
        }));
    }

    static mapStringToEnum(status: string): SkuStatusEnum {
        switch (status) {
            case 'Pre-registration':
                return SkuStatusEnum.PRE_REGISTER;
            case 'Complete Registration':
                return SkuStatusEnum.COMPLETE_REGISTER;
            case 'Active':
                return SkuStatusEnum.ACTIVE;
            case 'Disabled':
                return SkuStatusEnum.DISABLED;
            case 'Canceled':
                return SkuStatusEnum.CANCELED;
            default:
                throw new Error(`Invalid enum value: '${status}'`);
        }
    }

    static keyStringToEnum(key: string): SkuStatusEnum {
        if (!(key in SkuStatusEnum)) {
            throw new Error(`Invalid enum key: '${key}'`);
        }

        return SkuStatusEnum[key as keyof typeof SkuStatusEnum];
    }
}
