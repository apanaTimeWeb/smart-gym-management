// RESPONSIBILITY: Owns canonical non-validation HTTP error serialization.
// FLOW: Exception -> HTTP classification -> machine-readable ApiResponse error envelope.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import type { Response } from 'express';

@Catch()
export class CoreExceptionFilter implements ExceptionFilter {
  /** @description Serializes unexpected and application HTTP errors without leaking sensitive internals. @param exception - Thrown application error. @param host - HTTP execution host. @returns Nothing after writing the response. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const httpException = exception instanceof HttpException ? exception : null;
    const exceptionResponse = httpException?.getResponse();
    const status = httpException?.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const body = typeof exceptionResponse === 'object' && exceptionResponse !== null ? exceptionResponse as Record<string, unknown> : {};
    if (body.__validation === true) return;
    const message = typeof body.message === 'string' ? body.message : status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal server error' : exception instanceof Error ? exception.message : 'Request failed';
    const errorCode = typeof body.errorCode === 'string' ? body.errorCode : status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'CORE.HTTP.INTERNAL_SERVER_ERROR' : 'CORE.HTTP.REQUEST_FAILED';
    const error = typeof body.error === 'string' ? body.error : status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'INTERNAL_SERVER_ERROR' : 'HTTP_ERROR';
    response.status(status).json({ success: false, message, data: null, error, errorCode, statusCode: status });
  }
}
