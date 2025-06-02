import useCreateSku from "@/hooks/useCreateSku";
import useGetSkuById from "@/hooks/useGetSkuById";
import { ISkuData } from "@/interfaces/ISkuData";
import { SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    isEditMode,
    populateFormFromSku,
    validateForm,
    canEditField
} from "./sku.rules"
import { showToast } from "@/components/ToastNotification/ToastNotification";
import { useUpdateSkuById } from "@/hooks/useUpdateSku";
import { UpdateSkuParams } from "@/service/SkuService";
import { SkuStatusMapper } from "@/utils/skuStatusMapper";


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

export default function SkuRegisterFunctions() {
    const selectedSkuIdParam = useSearchParams().get('skuId');
    const [currentSku, setCurrentSku] = useState<ISku | undefined>();

    const router = useRouter()
    const {
        createSku,
        isPending: isCreatingSku,
        isSuccess: isCreated,
        isError: notCreated,
        error: createException
    } = useCreateSku();


    const { mutate, isPending, isSuccess, error } = useUpdateSkuById(
        currentSku?.id?.toString(),
        { enabled: !!currentSku?.id?.toString() }
    );

    const {
        data,
        isPending: isFetching,
        error: fetchError,
    } = useGetSkuById(selectedSkuIdParam!, {
        enabled: !!selectedSkuIdParam && !currentSku,
    });

    useEffect(() => {
        if (selectedSkuIdParam && data) {
            setCurrentSku(data);
            const formData = populateFormFromSku(data);
            setForm(formData);
        }

        if (!selectedSkuIdParam) {
            setCurrentSku(undefined);
            setForm({
                sku: '',
                descricao: '',
                descricaoComercial: '',
                status: "Pre-registration"
            });
        }
    }, [selectedSkuIdParam, data]);

    const [form, setForm] = useState<SkuFormData>({
        sku: '',
        descricao: '',
        descricaoComercial: '',
        status: ''
    });

    const [errors, setErrors] = useState<SkuErrors>({
        sku: false,
        descricao: false,
        descricaoComercial: false,
    });

    const handleTextFieldChange = (field: keyof typeof form) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm({ ...form, [field]: event.target.value });
            setErrors({ ...errors, [field]: false });
        };

    const handleSelectChange = (field: keyof typeof form) =>
        (event: SelectChangeEvent<any>) => {
            setForm({ ...form, [field]: event.target.value });
            setErrors({ ...errors, [field]: false });
        };

    const handlePreRegister = () => {
        const hasError = {
            sku: !form?.sku || form?.sku.trim() === '',
            descricaoComercial: !form.descricaoComercial || form.descricaoComercial.trim() === '',
        };

        setErrors(hasError);

        if (Object.values(hasError).some(Boolean)) return;

        createSku(form as ISkuData);
    };

    const handleUpdateSku = () => {
        if (!currentSku?.id) {
          showToast('ID do SKU inválido.', 'error');
          return;
        }

        mutate({
          skuId: currentSku.id.toString(),
          updateParams: {...form, status: SkuStatusMapper.keyStringToEnum(currentSku.status.status)},
        });
    };

    const handleCancelRegister = () => {
        router.push("/sku/list")
    }

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
        handleUpdateSku
    }
} 