// RESPONSIBILITY: Converts validation, HTTP, and unexpected exceptions into the canonical ApiResponse error envelope.
// FLOW: Exception â†’ canonical status/errorCode mapping â†’ frontend error contract.

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class CoreValidationExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const isHttp = exception instanceof HttpException;
    const statusCode = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const raw = isHttp ? exception.getResponse() : null;

    if (statusCode === HttpStatus.BAD_REQUEST && this.hasValidationArray(raw)) {
      const rawRecord = raw as { message?: unknown; validationErrors?: unknown };
      const validationErrors = Array.isArray(rawRecord.validationErrors) ? rawRecord.validationErrors : this.flattenValidation(rawRecord.message as string[]);
      response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed. Please check the highlighted fields.',
        data: null,
        error: 'VALIDATION_ERROR',
        errorCode: 'VALIDATION.DTO.FAILED',
        statusCode: HttpStatus.BAD_REQUEST,
        validationErrors,
      });
      return;
    }

    const message = statusCode >= HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal server error.' : this.safeMessage(raw);
    const errorName = statusCode >= HttpStatus.INTERNAL_SERVER_ERROR ? 'INTERNAL_SERVER_ERROR' : this.safeError(raw, statusCode);
    const errorCode = statusCode >= HttpStatus.INTERNAL_SERVER_ERROR ? 'INTERNAL.SERVER.ERROR' : this.safeErrorCode(raw, statusCode);

    response.status(statusCode).json({
      success: false,
      message,
      data: null,
      error: errorName,
      errorCode,
      statusCode,
    });
  }

  private hasValidationArray(raw: unknown): raw is { message: string[] } {
    if (!raw || typeof raw !== 'object') return false;
    return Array.isArray((raw as { message?: unknown }).message);
  }

  private flattenValidation(values: string[]): Array<{ field: string; message: string }> {
    return values.map((message) => ({ field: '_', message }));
  }

  private safeMessage(raw: unknown): string {
    if (typeof raw === 'string') return raw;
    if (raw && typeof raw === 'object' && typeof (raw as { message?: unknown }).message === 'string') return (raw as { message: string }).message;
    return 'Request failed.';
  }

  private safeError(raw: unknown, statusCode: number): string {
    if (raw && typeof raw === 'object' && typeof (raw as { error?: unknown }).error === 'string') return (raw as { error: string }).error;
    return HttpStatus[statusCode] ?? 'HTTP_ERROR';
  }

  private safeErrorCode(raw: unknown, statusCode: number): string {
    if (raw && typeof raw === 'object' && typeof (raw as { errorCode?: unknown }).errorCode === 'string') return (raw as { errorCode: string }).errorCode;
    return `HTTP.${statusCode}`;
  }
}
