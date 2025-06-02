import express from 'express';
import cors from 'cors';
import { globalExceptionHandler } from '../../http/errors/GlobalExceptionHandler';
import skuRouter from '../routes/sku.router';

export function setupExpress() {
  const app = express();
  
  const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:4000',
  ]

  app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));


  app.use(express.json());

  app.use('/api/v1', skuRouter);

  app.use(globalExceptionHandler);

  return app;
}
