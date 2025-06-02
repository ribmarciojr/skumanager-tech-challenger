import winston from 'winston';

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${level.toUpperCase()}] ${timestamp} ${message}`;
});

export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'app.log' }) // opcional
  ],
});
