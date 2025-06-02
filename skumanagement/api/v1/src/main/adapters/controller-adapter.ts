import { Request, Response, NextFunction } from 'express'
import { ICreateSkuController } from '../../http/interface/ICreateSkuController'

type IController = (req: Request, res: Response) => any;

export function adaptController(controller: IController) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controller(req, res)
    } catch (error) {
      next(error)
    }
  }
}