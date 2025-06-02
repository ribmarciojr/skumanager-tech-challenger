'use client';

import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import React from 'react';

interface BackButtonProps {
  previusRoute: string;
}


const BackButton: React.FC<BackButtonProps> = ({previusRoute}) => {
  const router = useRouter();


  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => router.push(previusRoute)}
      sx={{ textTransform: 'none' }}
    >
      Voltar
    </Button>
  );
};

export default BackButton;
