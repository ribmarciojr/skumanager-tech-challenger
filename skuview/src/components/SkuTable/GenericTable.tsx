'use client';

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, tableCellClasses, styled } from '@mui/material';

interface Column {
    id: string;
    label: string;
    render?: (row: any) => React.ReactNode;
}

interface Action {
    icon?: React.ReactNode;
    label?: string;
    onClick: (row: any) => void;
}

export interface GenericTableProps {
    data: any[];
    columns: Column[];
    actions?: Action[];
    currentPage: number;
    rowsPerPage: number;
    totalElements: number;
    handleChangePage?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showHeader?: boolean;
}

const GenericTable: React.FC<GenericTableProps> = ({
    data,
    columns,
    actions,
    currentPage,
    rowsPerPage,
    totalElements,
    handleChangePage,
    handleChangeRowsPerPage,
    showHeader = true,
}) => {
    const indexOfLastRow = (currentPage + 1) * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data;

    return (
        <Paper elevation={3} style={{ position: 'relative', boxShadow: 'none' }}>
            <TableContainer>
                <Table>
                    {showHeader && (
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{column.label}</TableCell>
                                ))}
                                {actions && <TableCell sx={{ display: "flex", justifyContent: "center" }}>Ação</TableCell>}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {currentRows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center">
                                    Nenhum registro encontrado.
                                </TableCell>
                            </TableRow>)}

                        {currentRows.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {column.render ? column.render(row) : row[column.id]}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: 0,
                                            padding: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: 'transparent'
                                        }}>
                                            {actions.map((action, actionIndex) => (
                                                <button
                                                    key={actionIndex}
                                                    onClick={() => action.onClick(row)}
                                                    style={{ marginRight: '8px' }}
                                                >
                                                    {action.icon && <span>{action.icon}</span>}
                                                    {action.label && <span>{action.label}</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {handleChangePage && handleChangeRowsPerPage && currentRows.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Linhas por página"
                    getItemAriaLabel={(type) => {
                        switch (type) {
                            case 'next': return 'Proxima página';
                            case 'previous': return 'Pagina anterior';
                            default: return 'Page';
                        }
                    }}
                />
            )}
        </Paper>
    );
};

export default GenericTable;