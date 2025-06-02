"use client"



import SkuTable from "@/components/SkuTable/SkuTable";
import StatusFilter from '@/components/StatusFilter/StatusFilter';
import { SkuStatusMapper } from '@/utils/skuStatusMapper';
import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import SkuListFunctions from './skuListFunctions';
import { useShortText } from "@/hooks/useShortText";
import { ToastContainer } from "react-toastify";

const onlyViewAllowed = [
    "Active",
	"Disabled",
	"Canceled"
]

export default function SkuListPage() {
    const {
        data,
        currentPage,
        rowsPerPage,
        router,
        isLoading,
        filterStatus,
        handleChangePage,
        handleChangeRowsPerPage,
        onChangeFilter,
        handleSkuEdit
    } = SkuListFunctions();

    return (
        <div>
            
            <Typography variant="h4" component="h4" gutterBottom>
                Lista de SKU
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                }}
            >
                <Typography variant="body1">
                    Aqui estão os detalhes dos SKUs listados.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <StatusFilter value={filterStatus} onChange={onChangeFilter} />
                    <Button variant="contained" sx={{ backgroundColor: "#93DA49", color: "white" }} onClick={() => router.push('/sku/register')}>
                        Cadastrar
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ margin: '16px 0' }} />
            
            <Box>
                {data && <SkuTable
                    data={
                        data.data.map((sku) => ({
                          ...sku,
                          descricao: useShortText(sku.descricao),
                          status: SkuStatusMapper.mapToLabel(SkuStatusMapper.mapToEnum(filterStatus)),
                        }))
                      }
                    skuStatusType={SkuStatusMapper.mapStringToEnum(filterStatus)}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    totalElements={data.total}
                    onEdit={!onlyViewAllowed.includes(filterStatus) ? handleSkuEdit : undefined}
                    onView={onlyViewAllowed.includes(filterStatus) ? handleSkuEdit : undefined}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
                }

                {
                    isLoading && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={400}
                            sx={{ marginTop: 2 }}
                        />
                    )
                }
            </Box>
        </div>
    );
}