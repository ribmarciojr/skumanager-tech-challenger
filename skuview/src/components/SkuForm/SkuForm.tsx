'use client';

import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

type SkuFormProps = {
  formTitle: string;
  onSubmit?: () => void;
  children: React.ReactNode;
};

const SkuForm: React.FC<SkuFormProps> = ({ formTitle, onSubmit, children }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {formTitle}
      </Typography>

      <Stack spacing={2}>
        {children}
      </Stack>
    </Box>
  );
};

export default SkuForm;
