import { showToast } from "@/components/ToastNotification/ToastNotification";
import useCreateSku from "@/hooks/useCreateSku";
import useGetSkuById from "@/hooks/useGetSkuById";
import { useUpdateSkuById } from "@/hooks/useUpdateSku";
import { ISkuData } from "@/interfaces/ISkuData";
import { SkuStatusMapper } from "@/utils/skuStatusMapper";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { canEditField, populateFormFromSku } from "./sku.rules";

interface SkuFormData {
  sku?: string;
  descricao?: string;
  descricaoComercial?: string;
  status?: string;
}

interface SkuErrors {
  sku?: boolean;
  descricao?: boolean;
  descricaoComercial?: boolean;
  status?: boolean;
}

export default function SkuRegisterFunctions(skuId?: string) {
  const selectedSkuIdParam = skuId;
  const [currentSku, setCurrentSku] = useState<ISku | undefined>();

  const router = useRouter();

  const {
    createSku,
    isPending: isCreatingSku,
    isSuccess: isCreated,
    isError: notCreated,
    error: createException,
  } = useCreateSku();

  const { mutate, isPending, isSuccess, error } = useUpdateSkuById(
    currentSku?.id?.toString(),
    { enabled: !!currentSku?.id?.toString() },
  );

  let data: ISku | undefined;
  if (typeof selectedSkuIdParam === "string") {
    const query = useGetSkuById(selectedSkuIdParam, {
      enabled: !!selectedSkuIdParam && !currentSku,
    });
    data = query.data;
  }

  useEffect(() => {
    if (selectedSkuIdParam && data) {
      setCurrentSku(data);
      const formData = populateFormFromSku(data);
      setForm(formData);
    }

    if (!selectedSkuIdParam) {
      setCurrentSku(undefined);
      setForm({
        sku: "",
        descricao: "",
        descricaoComercial: "",
        status: "Pre-registration",
      });
    }
  }, [selectedSkuIdParam, data]);

  const [form, setForm] = useState<SkuFormData>({
    sku: "",
    descricao: "",
    descricaoComercial: "",
    status: "",
  });

  const [errors, setErrors] = useState<SkuErrors>({
    sku: false,
    descricao: false,
    descricaoComercial: false,
  });

  const handleTextFieldChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: event.target.value });
      setErrors({ ...errors, [field]: false });
    };

  const handleSelectChange =
    (field: keyof typeof form) => (event: SelectChangeEvent<any>) => {
      setForm({ ...form, [field]: event.target.value });
      setErrors({ ...errors, [field]: false });
    };

  const handlePreRegister = () => {
    const hasError = {
      sku: !form?.sku || form?.sku.trim() === "",
      descricaoComercial:
        !form.descricaoComercial || form.descricaoComercial.trim() === "",
    };

    setErrors(hasError);

    if (Object.values(hasError).some(Boolean)) return;

    createSku(form as ISkuData);
  };

  const handleUpdateSku = () => {
    if (!currentSku?.id) {
      showToast("ID do SKU inválido.", "error");
      return;
    }

    mutate({
      skuId: currentSku.id.toString(),
      updateParams: {
        ...form,
        status: SkuStatusMapper.keyStringToEnum(currentSku.status.status),
      },
    });
  };

  const handleCancelRegister = () => {
    router.push("/sku/list");
  };

  return {
    form,
    errors,
    isCreatingSku,
    currentSku,
    handleCancelRegister,
    setForm,
    setErrors,
    handleSelectChange,
    handleTextFieldChange,
    handlePreRegister,
    createSku,
    canEditField,
    handleUpdateSku,
  };
}
