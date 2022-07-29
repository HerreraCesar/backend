import winston from "winston";

export const requestLogger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "info" })],
});

export const Logger404 = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "warn" }),
    new winston.transports.File({
      filename: "./13_LoggersGzipYAnalisisDePerformance/logs/warn.log",
      level: "warn",
    }),
  ],
});

export const errorApiLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({
      filename: "./13_LoggersGzipYAnalisisDePerformance/logs/error.log",
      level: "error",
    }),
  ],
});
