import BackButton from "@/components/BackButton/BackButton";
import { SkuRegisterForm } from "@/components/SkuForm/SkuRegisterForm";
import { Typography } from "@mui/material";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default async function SkuEditPage({
  params,
}: {
  params: Promise<{ skuId: string }>;
}) {
  const skuId = (await params).skuId;
  console.log(skuId);
  return (
    <div>
      <Typography variant="h4" component="h4" gutterBottom>
        Registro de SKU
      </Typography>

      <Typography variant="body1">
        Conclua o pré-cadastro do SKU para liberar o cadastro completo.
      </Typography>

      <Suspense fallback={<div>Carregando...</div>}>
        <SkuRegisterForm searchParams={{ skuId }} />
      </Suspense>

      <BackButton previusRoute="/sku/list" />

      <ToastContainer />
    </div>
  );
}
