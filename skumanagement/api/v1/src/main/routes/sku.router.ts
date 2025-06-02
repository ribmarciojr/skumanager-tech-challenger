import { Router } from 'express';
import { SkuRepositorySQL } from '../../infra/repositories/skuRepository';
import { CreateSkuUseCase } from '../../application/usecases/create-sku/create-sku';
import CreateSkuController from '../../http/controllers/CreateSkuController';
import { ListSkusUseCase } from '../../application/usecases/list-sku/list-sku';
import { ListSkuController } from '../../http/controllers/ListSkuController';
import { adaptController } from '../adapters/controller-adapter';
import { CompleteRegisterState } from '../../domain/states/CompleteRegisterState';
import { CompleteSkuRegistrationUseCase } from '../../application/usecases/complete-sku-registration/complete-sku-registration';
import { CompleteSkuRegistrationController } from '../../http/controllers/CompleteSkuRegistrationController';
import { UpdateSkuStatusUseCase } from '../../application/usecases/update-sku-status/update-sku-status';
import { UpdateSkuStatusController } from '../../http/controllers/UpdateSkuStatusController';
import { WinstonLoggerAdapter } from '../../infra/logger/winton.adapter';
import { GetSkuByIdUseCase } from '../../application/usecases/get-sku-by-id/get-sku-by-id';
import { GetSkuByIdController } from '../../http/controllers/GetSkuByIdController';
import { SkuStateMachine } from '../../domain/states/SkuStateMachine';

const skuRouter = Router();
const skuRepository = new SkuRepositorySQL();
const winstonLogger = new WinstonLoggerAdapter()

skuRouter.post('/sku', async (req, res, next) => {
  const createSkuUseCase = new CreateSkuUseCase(skuRepository, winstonLogger);
  const createSkuController = new CreateSkuController(createSkuUseCase, winstonLogger);
  
  return adaptController((req, res) => createSkuController.create(req, res))(req, res, next)
});

skuRouter.get("/sku/all", async (req, res, next) => {
  const listSkuUseCase = new ListSkusUseCase(skuRepository);
  const listSkuController = new ListSkuController(listSkuUseCase);
  
  return adaptController((req, res) => listSkuController.listSkus(req, res))(req, res, next);
})

skuRouter.get("/sku/status", async (req, res, next) => {
  const listSkuUseCase = new ListSkusUseCase(skuRepository);
  const listSkuController = new ListSkuController(listSkuUseCase);
  
  await adaptController((req, res) => listSkuController.listSkusStatusValues(req, res))(req, res, next);
})

skuRouter.get("/sku/:id", async (req, res) => {
  const getSkuByIdUseCase = new GetSkuByIdUseCase(skuRepository, winstonLogger);
  const getSkuByIdController = new GetSkuByIdController(getSkuByIdUseCase, winstonLogger);

  await getSkuByIdController.get(req, res);
})

skuRouter.put("/sku/:id/complete", async (req, res, next) => {
  const completeSkuUseCase = new CompleteSkuRegistrationUseCase(skuRepository);
  const completeSkuController = new CompleteSkuRegistrationController(completeSkuUseCase);

  return adaptController((req, res) => completeSkuController.complete(req, res))(req, res, next);
})

skuRouter.put("/sku/:id", async (req, res, next) => {
  const updateSkuUseCase = new UpdateSkuStatusUseCase(skuRepository);
  const updateSkuController = new UpdateSkuStatusController(updateSkuUseCase);

  return adaptController((req, res) => updateSkuController.update(req, res))(req, res, next);
})


export default skuRouter;
