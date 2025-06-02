import prismaClient from '../prisma/client';
import { FindAllSkusParams, FindAllSkusResult, ISkuRepository } from '../../domain/repositories/skuRepositoryInterface';
import { SkuEntity } from '../../domain/entities/SkuEntity';
import { SkuStatusType } from '../../domain/entities/SkuStatusType';
import { SkuStatusEnum } from '../../domain/enum/SkuStatusEnum';
import { SkuStatusMapper } from '../mappers/SkuStatusMapper';
import { SkuListItemDTO } from '../../application/dto/SkuListItemDTO';
import { SkuDTO } from '../../application/dto/SkuDTO';
import { StatusDTO } from '../../application/dto/StatusDTO';
import { UpdateSkuParams } from '../../domain/interfaces/IUpdateSkuParams';

export class SkuRepositorySQL implements ISkuRepository {
    async create(descricaoComercial: string, sku: string, descricao: string): Promise<void> {
        await prismaClient.skuEntity.create({
            data: {
                descricaoComercial,
                sku,
                descricao,
                status: {
                    create: {
                        // @ts-ignore
                        status: SkuStatusMapper.toPrisma(SkuStatusEnum.PRE_REGISTER),
                    }
                }
            },
        });
    }

    async findById(id: number): Promise<SkuDTO | null> {
        const sku = await prismaClient.skuEntity.findUnique({
            where: { id },
            include: {
                status: true,
            },
        });

        if (!sku) {
            return null;
        }

        if (!sku.status) {
            throw new Error('Sku status not found');
        }
        const domainStatus = SkuStatusMapper.toDomain(sku.status.status);

        const status: StatusDTO = {
            id: sku.status.id,
            status: sku.status.status,
        };

        return {
            id: sku.id,
            descricaoComercial: sku.descricaoComercial,
            sku: sku.sku,
            status: status,
            descricao: sku.descricao,
        };
    }

    async findBySku(sku: string): Promise<SkuEntity | null> {
        const skuData = await prismaClient.skuEntity.findUnique({
            where: { sku },
            include: {
                status: true,
            },
        });

        if (!skuData) {
            return null;
        }

        if (!skuData.status) {
            throw new Error('Sku status not found');
        }
        const domainStatus = SkuStatusMapper.toDomain(skuData.status.status);

        return new SkuEntity(
            skuData.id,
            skuData.descricao,
            skuData.descricaoComercial,
            skuData.sku,
            // @ts-ignore
            new SkuStatusType(skuData.status.id, domainStatus)
        );
    }

    async getPage(params: FindAllSkusParams): Promise<FindAllSkusResult> {
        const { page, pageSize, skuStatus } = params;
        const skip = (page - 1) * pageSize;

        const statusFilter = skuStatus ? { status: { status: SkuStatusMapper.toPrisma(skuStatus) } } : {};

        const [skus, total] = await prismaClient.$transaction([
            prismaClient.skuEntity.findMany({
                where: statusFilter,
                skip,
                take: pageSize,
                orderBy: { id: 'asc' },
                include: { status: true },
            }),
            prismaClient.skuEntity.count({
                where: statusFilter,
            }),
        ]);

        if (!skus) {
            return { skus: [], total: 0 };
        }

        const skuEntities: SkuListItemDTO[] = skus.map(sku => {
            if (!sku.status) {
                throw new Error('Sku status not found');
            }
            return {
                id: sku.id,
                descricao: sku.descricao,
                descricaoComercial: sku.descricaoComercial,
                sku: sku.sku,
                statusId: sku.status.id,
            };
        });

        return { skus: skuEntities, total };
    }

    async update(id: number, descricao: string): Promise<void> {
        try {
            await prismaClient.$transaction(async (tx) => {
                await tx.skuEntity.update({
                    where: { id },
                    data: { descricao },
                });

                await tx.skuStatusType.updateMany({
                    where: { sku: { id } },
                    data: { status: SkuStatusMapper.toPrisma(SkuStatusEnum.ACTIVE) },
                });
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating SKU and status: ${error.message}`);
            }
            else {
                console.error(`Error updating SKU and status: ${error}`);
            }
        }
    }

    async updateStatus({
        skuId,
        askedStatus,
        newSku,
        descricao,
        descricaoComercial,
    }: UpdateSkuParams): Promise<void> {
        const updateData: Record<string, any> = {};

        if (newSku != null) updateData.sku = newSku;
        if (descricao != null) updateData.descricao = descricao;
        if (descricaoComercial != null) updateData.descricaoComercial = descricaoComercial;

        if (Object.keys(updateData).length > 0) {
            await prismaClient.skuEntity.update({
                where: { id: skuId },
                data: updateData,
            });
        }

        await prismaClient.skuEntity.update({
            where: { id: skuId },
            data: {
                status: {
                    update: {
                        status: SkuStatusMapper.toPrisma(askedStatus),
                    },
                },
            },
        });
    }
}