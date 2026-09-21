// RESPONSIBILITY: Converts controlled business errors into the canonical error envelope.
// FLOW: Exception -> normalized status/errorCode -> ApiResponse<null>.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@/backend_superadmin/core/types/api-response.types';
@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  /** Serializes controlled and unknown exceptions without leaking implementation details. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    if (exception instanceof HttpException && exception.getStatus() < HttpStatus.INTERNAL_SERVER_ERROR) {
      const statusCode = exception.getStatus();
      const body: ApiResponse<null> = { success: false, message: exception.message, data: null, error: exception.name, errorCode: 'HTTP.REQUEST.FAILED', statusCode };
      response.status(statusCode).json(body);
      return;
    }
    const body: ApiResponse<null> = { success: false, message: 'Internal server error', data: null, error: 'INTERNAL_SERVER_ERROR', errorCode: 'CORE.INTERNAL.ERROR', statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}
