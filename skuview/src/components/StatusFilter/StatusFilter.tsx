import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    Typography,
    SelectChangeEvent,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import useAvailableStatus from '@/hooks/useAvailableStatus';
import { SkuStatusEnum } from '@/enums/SkuStatusEnum';
import { SkuStatusMapper } from '@/utils/skuStatusMapper';

interface StatusFilterProps {
    value: string;
    onChange: (value: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data } = useAvailableStatus();

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleOpen} size="small">
                <FilterListIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { padding: 2, minWidth: 200 },
                }}
            >
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Filtrar por Status
                    </Typography>
                    <FormControl fullWidth size="small">
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            value={value}
                            label="Status"
                            onChange={handleChange}
                        >
                            {data?.map((status: string) => (
                                <MenuItem key={status} value={status}>
                                    {SkuStatusMapper.mapToLabel(SkuStatusMapper.mapToEnum(status))}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Menu>
        </>
    );
};

export default StatusFilter;
