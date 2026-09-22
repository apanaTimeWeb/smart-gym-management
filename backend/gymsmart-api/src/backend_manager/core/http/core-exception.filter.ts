// RESPONSIBILITY: Canonical non-validation HTTP/domain error response formatter.
// FLOW: Exception → classify → ApiResponse error envelope with data:null.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class CoreExceptionFilter implements ExceptionFilter {
  /**
   * @description Formats non-validation exceptions into the canonical error envelope.
   * @param exception - Thrown application or HTTP exception.
   * @param host - Current HTTP host.
   * @returns Nothing after writing the response.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    if (exception instanceof HttpException && exception.getStatus() === HttpStatus.BAD_REQUEST && Array.isArray((exception.getResponse() as { message?: unknown }).message)) return;
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = exception instanceof HttpException ? exception.getResponse() : null;
    const body = typeof payload === 'object' && payload !== null ? payload as Record<string, unknown> : {};
    response.status(status).json({
      success: false,
      message: String(body.message ?? (exception instanceof Error ? exception.message : 'Internal server error')),
      data: null,
      error: String(body.error ?? (status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'HTTP_ERROR')),
      errorCode: String(body.errorCode ?? `HTTP.${status}`),
      statusCode: status,
    });
  }
}
