
import { ILogger } from '../../domain/interfaces/ILogger';
import { winstonLogger } from './winston.logger';

export class WinstonLoggerAdapter implements ILogger {
  info(message: string, meta?: Record<string, any>): void {
    winstonLogger.info(message, meta);
  }

  warn(message: string, meta?: Record<string, any>): void {
    winstonLogger.warn(message, meta);
  }

  error(message: string, meta?: Record<string, any>): void {
    winstonLogger.error(message, meta);
  }

  debug(message: string, meta?: Record<string, any>): void {
    winstonLogger.debug(message, meta);
  }
}
