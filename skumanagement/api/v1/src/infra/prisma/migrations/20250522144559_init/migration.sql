-- CreateTable
CREATE TABLE "SkuEntity" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "descricaoComercial" TEXT NOT NULL,
    "sku" INTEGER NOT NULL,

    CONSTRAINT "SkuEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkuEntity_sku_key" ON "SkuEntity"("sku");
