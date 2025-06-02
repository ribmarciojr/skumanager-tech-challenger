// src/infra/mappers/SkuStatusMapper.ts

import { SkuStatusEnum as PrismaStatusEnum } from '@prisma/client';
import { SkuStatusEnum } from '../../domain/enum/SkuStatusEnum';

export class SkuStatusMapper {
    private static readonly STATUS_KEY_TO_ENUM: Record<string, SkuStatusEnum> = {
        PRE_REGISTER: SkuStatusEnum.PRE_REGISTER,
        COMPLETE_REGISTER: SkuStatusEnum.COMPLETE_REGISTER,
        ACTIVE: SkuStatusEnum.ACTIVE,
        DISABLED: SkuStatusEnum.DISABLED,
        CANCELED: SkuStatusEnum.CANCELED,
    };


    static toDomain(prismaStatus: PrismaStatusEnum): SkuStatusEnum {
        switch (prismaStatus) {
            case PrismaStatusEnum.PRE_REGISTER:
                return SkuStatusEnum.PRE_REGISTER;
            case PrismaStatusEnum.COMPLETE_REGISTER:
                return SkuStatusEnum.COMPLETE_REGISTER;
            case PrismaStatusEnum.ACTIVE:
                return SkuStatusEnum.ACTIVE;
            case PrismaStatusEnum.DISABLED:
                return SkuStatusEnum.DISABLED;
            case PrismaStatusEnum.CANCELED:
                return SkuStatusEnum.CANCELED;
            default:
                throw new Error(`Unrecognized Prisma status: ${prismaStatus}`);
        }
    }

    static toPrisma(domainStatus: SkuStatusEnum): PrismaStatusEnum {
        switch (domainStatus) {
            case SkuStatusEnum.PRE_REGISTER:
                return PrismaStatusEnum.PRE_REGISTER;
            case SkuStatusEnum.COMPLETE_REGISTER:
                return PrismaStatusEnum.COMPLETE_REGISTER;
            case SkuStatusEnum.ACTIVE:
                return PrismaStatusEnum.ACTIVE;
            case SkuStatusEnum.DISABLED:
                return PrismaStatusEnum.DISABLED;
            case SkuStatusEnum.CANCELED:
                return PrismaStatusEnum.CANCELED;
            default:
                throw new Error(`Unrecognized domain status: ${domainStatus}`);
        }
    }

    static mapToEnum(status: string): SkuStatusEnum {
        const key = Object.keys(SkuStatusEnum).find(
            (k) => SkuStatusEnum[k as keyof typeof SkuStatusEnum] == status
        );
        if (!key) {
            throw new Error(`Invalid status value: '${status}'`);
        }

        return SkuStatusEnum[key as keyof typeof SkuStatusEnum];
    }


    static mapFromKey(status: string): SkuStatusEnum {
        const mapped = this.STATUS_KEY_TO_ENUM[status];
        if (!mapped) {
            throw new Error(`Invalid status value: '${status}'`);
        }
        return mapped;
    }

    static keyStringToEnum(key: string): SkuStatusEnum {
        if (!(key in SkuStatusEnum)) {
            throw new Error(`Invalid enum key: '${key}'`);
        }

        return SkuStatusEnum[key as keyof typeof SkuStatusEnum];
    }

    static fromValue(value: string): SkuStatusEnum {
        switch (value) {
            case "Pre-registration":
                return SkuStatusEnum.PRE_REGISTER;
            case "Complete Registration":
                return SkuStatusEnum.COMPLETE_REGISTER;
            case "Active":
                return SkuStatusEnum.ACTIVE;
            case "Disabled":
                return SkuStatusEnum.DISABLED;
            case "Canceled":
                return SkuStatusEnum.CANCELED;
            default:
                throw new Error(`Invalid status value: '${value}'`);
        }
    }
}
