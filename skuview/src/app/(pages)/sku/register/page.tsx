"use client"

import BackButton from "@/components/BackButton/BackButton";
import SkuForm from "@/components/SkuForm/SkuForm";
import { SkuStatusEnum } from "@/enums/SkuStatusEnum";
import { SkuStatusMapper } from "@/utils/skuStatusMapper";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { isEditMode } from "./sku.rules";
import SkuRegisterFunctions from "./skuRegisterFunctions";

const statusOptions = [
    { value: 'PRE_REGISTER', label: 'Pré-registro' },
    { value: 'COMPLETE_REGISTER', label: 'Registro completo' },
    { value: 'ACTIVE', label: 'Ativo' },
    { value: 'DISABLED', label: 'Desativado' },
    { value: 'CANCELED', label: 'Cancelado' },
];


export default function SkuRegisterPage() {
    const {
        form,
        errors,
        isCreatingSku,
        currentSku,
        createSku,
        setForm,
        setErrors,
        handleSelectChange,
        handleTextFieldChange,
        handlePreRegister,
        canEditField,
        handleCancelRegister,
        handleUpdateSku
    } = SkuRegisterFunctions();

    const isEditing = isEditMode(currentSku?.id);
    const editableFields = currentSku?.canEditFields || [];

    return (
        <div>
            <Typography variant="h4" component="h4" gutterBottom>
                Registro de SKU
            </Typography>

            <Typography variant="body1">
                Conclua o pré-cadastro do SKU para liberar o cadastro completo.
            </Typography>
            {/* Remover pre-cadastro */}
            <SkuForm formTitle="Pré-cadastro" onSubmit={isEditing ? handleUpdateSku : handlePreRegister}>
                <TextField
                    label="SKU*"
                    fullWidth
                    value={form.sku}
                    disabled={!canEditField("sku", isEditing, editableFields)}
                    onChange={handleTextFieldChange('sku')}
                    error={errors.sku}
                    helperText={errors.sku && 'SKU é obrigatório'}
                    placeholder="111110"
                />
                <TextField
                    label="Descrição Comercial*"
                    fullWidth
                    rows={2}
                    value={form.descricaoComercial}
                    onChange={handleTextFieldChange('descricaoComercial')}
                    disabled={!canEditField("descricaoComercial", isEditing, editableFields)}
                    error={errors.descricaoComercial}
                    helperText={errors.descricaoComercial && 'Descrição comercial é obrigatória'}
                    placeholder="Perfume floral, frescor incrível."
                />

                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={2}
                    value={form.descricao}
                    disabled={!canEditField("descricao", isEditing, editableFields)}
                    onChange={handleTextFieldChange('descricao')}
                    error={errors.descricao}
                    helperText={errors.descricao && 'Descrição é obrigatória'}
                />

                <TextField
                    fullWidth
                    select
                    label="Status*"
                    value={form.status || ""}
                    onChange={handleTextFieldChange('status')}
                    error={errors.status}
                    helperText={errors.status && 'Status é obrigatório'}
                    disabled={!isEditing}
                    
                >
                    <MenuItem value="" disabled>
                        <em>Selecione um status</em>
                    </MenuItem>

                    {isEditing
                        ? currentSku?.canTransitionTo?.map((option) => (
                            <MenuItem key={option} value={option}>
                                {SkuStatusMapper.mapStringToLabel(option)}
                            </MenuItem>
                        ))
                        : (
                            <MenuItem value={SkuStatusEnum.PRE_REGISTER}>
                                {SkuStatusMapper.mapStringToLabel(SkuStatusEnum.PRE_REGISTER)}
                            </MenuItem>
                        )
                    }
                </TextField>

                <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>

                    <Button onClick={handleCancelRegister} variant="contained" color="error">
                        Cancelar
                    </Button>

                    <Button disabled={isCreatingSku} type="submit" sx={{ backgroundColor: "#93DA49" }} variant="contained">
                        Salvar
                    </Button>
                </Box>
            </SkuForm>

            <BackButton previusRoute="/sku/list" />

            <ToastContainer />
        </div>
    );
}