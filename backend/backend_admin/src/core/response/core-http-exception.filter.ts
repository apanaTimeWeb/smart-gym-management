// RESPONSIBILITY: Converts unhandled HTTP/application errors into the canonical ApiResponse error envelope.
// FLOW: Exception → CoreHttpExceptionFilter → errorCode/statusCode/message → frontend.

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class CoreHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus();
    const payload = exception.getResponse();
    const message = typeof payload === 'string' ? payload : ((payload as { message?: string | string[] }).message ?? 'Request failed.');
    const errorName = typeof payload === 'object' && payload !== null && 'error' in payload
      ? String((payload as { error?: unknown }).error)
      : HttpStatus[statusCode] ?? 'HTTP_ERROR';
    const errorCode = typeof payload === 'object' && payload !== null && 'errorCode' in payload
      ? String((payload as { errorCode?: unknown }).errorCode)
      : `HTTP.${statusCode}`;

    response.status(statusCode).json({
      success: false,
      message: Array.isArray(message) ? message.join('; ') : message,
      data: null,
      error: errorName,
      errorCode,
      statusCode,
    });
  }
}
