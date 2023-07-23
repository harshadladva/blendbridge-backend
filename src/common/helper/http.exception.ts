import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface Error {
  statusCode: number;
  message: string[];
  error: string;
}

const generateErrorMessage = (message: string[]): string[] => {
  if (message?.length && typeof message === 'object') {
    return message.map(item =>
      item.includes('.') ? item.split('.').pop() : item
    );
  }
  return null;
};

@Catch(HttpException)
// eslint-disable-next-line unused-imports/no-unused-vars
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorList = exception.getResponse() as Error;
    const errorCode = errorList?.statusCode || status;
    response.status(errorCode).json({
      status: errorCode,
      message: generateErrorMessage(errorList?.message) || exception.message,
      errors: true,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
