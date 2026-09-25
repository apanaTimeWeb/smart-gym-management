// RESPONSIBILITY: Converts validation and application exceptions into the single canonical ApiResponse error envelope.
// FLOW: Exception -> status/error normalization -> canonical ApiResponse error JSON.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';

import { normalizeCoreErrorCode } from '@/backend_admin/admin_core/admin_core_response/admin-core-error-code'

import type { Response } from 'express';

interface AdminCoreValidationPayload {
  message?: string | string[];
  error?: string;
  errorCode?: string;
  validationErrors?: Array<{ field: string; message: string }>;
}

@Catch()
/**
 * @description Defines the AdminCoreValidationExceptionFilter boundary for the admin_core_response backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreValidationExceptionFilter implements ExceptionFilter {
  /** @description Serializes known and unknown exceptions into the canonical API error contract without exposing stack traces or payload data.
   * @param exception Thrown application or HTTP exception.
   * @param host Nest HTTP arguments host.
   * @returns void; writes a canonical error response.
   */
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = exception instanceof HttpException ? exception.getResponse() : { message: 'Internal server error.' };
    if (!(exception instanceof HttpException)) this.logger.error({ err: exception, statusCode }, 'Unhandled HTTP exception');
    const body: AdminCoreValidationPayload = typeof payload === 'object' && payload !== null
      ? payload as AdminCoreValidationPayload
      : { message: String(payload) };
    const validationErrors = statusCode === HttpStatus.BAD_REQUEST && Array.isArray(body.validationErrors) ? body.validationErrors : undefined;
    const message = typeof body.message === 'string'
      ? body.message
      : Array.isArray(body.message) ? body.message.join('; ') : statusCode >= 500 ? 'Internal server error.' : 'Request failed.';
    const error = validationErrors ? 'VALIDATION_ERROR' : String(body.error ?? HttpStatus[statusCode] ?? 'HTTP_ERROR');
    const errorCode = validationErrors ? 'VALIDATION.DTO.FAILED' : normalizeCoreErrorCode(body.errorCode ?? (statusCode >= 500 ? 'INTERNAL.SERVER.ERROR' : `HTTP.REQUEST.${statusCode}`));

    response.status(statusCode).json({
      success: false,
      message,
      data: null,
      error,
      errorCode,
      statusCode,
      ...(validationErrors ? { validationErrors } : {}),
    });
  }
}
