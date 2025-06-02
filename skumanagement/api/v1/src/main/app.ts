import { setupExpress } from './config/express';
import skuRouter from './routes/sku.router';

const app = setupExpress();

export default app;
