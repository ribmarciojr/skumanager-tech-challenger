/*
  Warnings:

  - A unique constraint covering the columns `[statusId]` on the table `SkuEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SkuStatusEnum" AS ENUM ('PRE_REGISTER', 'COMPLETE_REGISTER', 'ACTIVE', 'DISABLED', 'CANCELED');

-- AlterTable
ALTER TABLE "SkuEntity" ADD COLUMN     "statusId" INTEGER;

-- CreateTable
CREATE TABLE "SkuStatusType" (
    "id" SERIAL NOT NULL,
    "status" "SkuStatusEnum" NOT NULL,

    CONSTRAINT "SkuStatusType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkuEntity_statusId_key" ON "SkuEntity"("statusId");

-- AddForeignKey
ALTER TABLE "SkuEntity" ADD CONSTRAINT "SkuEntity_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "SkuStatusType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
