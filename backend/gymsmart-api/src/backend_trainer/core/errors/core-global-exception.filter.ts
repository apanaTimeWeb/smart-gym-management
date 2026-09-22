// RESPONSIBILITY: Converts validation, domain, HTTP, and unknown failures into the canonical API error envelope.
// FLOW: Thrown failure → status/code mapping → ApiResponse<T> error envelope.

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import type { ValidationError } from 'class-validator';
import type { CoreApiResponse, ValidationErrorItem } from '@/backend_trainer/core/types/core-api-response.types';
import { CoreDomainException } from '@/backend_trainer/core/errors/core-domain.exception';
import { CoreValidationException } from '@/backend_trainer/core/errors/core-validation.exception';

@Catch()
export class CoreGlobalExceptionFilter implements ExceptionFilter {
  /** Converts any thrown application error into the canonical error envelope. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    if (exception instanceof CoreValidationException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        success: false, message: 'Validation failed', data: null, error: 'VALIDATION_ERROR',
        errorCode: 'VALIDATION.DTO.FAILED', statusCode: HttpStatus.BAD_REQUEST,
        validationErrors: exception.validationErrors.flatMap((error) => this.flattenValidationError(error)),
      } satisfies CoreApiResponse<null>);
      return;
    }
    if (exception instanceof CoreDomainException) {
      response.status(exception.status).json(this.domainPayload(exception));
      return;
    }
    if (exception instanceof HttpException) {
      this.writeHttpException(exception, response);
      return;
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
      data: null,
      error: 'INTERNAL_ERROR',
      errorCode: 'CORE.INTERNAL.ERROR',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    } satisfies CoreApiResponse<null>);
  }

  /** Serializes a domain exception while preserving its machine-readable contract. */
  private domainPayload(exception: CoreDomainException): CoreApiResponse<null> {
    return {
      success: false, message: exception.message, data: null,
      error: exception.errorCode.split('.').pop() ?? 'DOMAIN_ERROR',
      errorCode: exception.errorCode, statusCode: exception.status,
    };
  }

  /** Maps a Nest HTTP exception into either a validation or structured HTTP error. */
  private writeHttpException(exception: HttpException, response: Response): void {
    const status = exception.getStatus();
    const raw = exception.getResponse();
    if (status === HttpStatus.BAD_REQUEST) {
      const rawMessage = this.extractMessage(raw);
      const validationErrors = this.toValidationErrors(rawMessage);
      if (validationErrors.length > 0) {
        response.status(HttpStatus.BAD_REQUEST).json({
          success: false, message: 'Validation failed', data: null,
          error: 'VALIDATION_ERROR', errorCode: 'VALIDATION.DTO.FAILED',
          statusCode: HttpStatus.BAD_REQUEST, validationErrors,
        } satisfies CoreApiResponse<null>);
        return;
      }
    }
    const message = this.firstMessage(raw);
    const explicitCode = typeof message === 'string' && /^[A-Z0-9]+(?:\.[A-Z0-9_]+){2,}$/.test(message) ? message : undefined;
    const errorCode = explicitCode ?? this.httpErrorCode(status);
    response.status(status).json({
      success: false, message: explicitCode ? 'Request rejected' : message || 'Request failed', data: null,
      error: explicitCode ? (explicitCode.split('.').pop() ?? 'HTTP_ERROR') : 'HTTP_ERROR',
      errorCode, statusCode: status,
    } satisfies CoreApiResponse<null>);
  }

  /** Extracts the message field from a Nest HTTP exception payload. */
  private extractMessage(raw: unknown): unknown {
    if (typeof raw === 'object' && raw !== null && 'message' in raw) return (raw as { message?: unknown }).message;
    return raw;
  }

  /** Returns the first human-readable message for a generic HTTP error. */
  private firstMessage(raw: unknown): string | undefined {
    const message = this.extractMessage(raw);
    if (typeof message === 'string') return message;
    if (Array.isArray(message)) return message.find((item): item is string => typeof item === 'string');
    return undefined;
  }

  /** Flattens class-validator errors into exact DTO property paths using dot notation. */
  private toValidationErrors(value: unknown): ValidationErrorItem[] {
    if (!Array.isArray(value)) return [];
    return value.flatMap((item) => this.flattenValidationError(item as ValidationError));
  }

  /** Recursively flattens one class-validator tree into field/message pairs. */
  private flattenValidationError(error: ValidationError, parentPath = ''): ValidationErrorItem[] {
    const path = parentPath ? `${parentPath}.${error.property}` : error.property;
    const own = Object.values(error.constraints ?? {}).map((message) => ({ field: path, message }));
    const nested = (error.children ?? []).flatMap((child: ValidationError) => this.flattenValidationError(child, path));
    return [...own, ...nested];
  }

  /** Produces a stable domain-style machine code for generic HTTP exceptions. */
  private httpErrorCode(status: number): string {
    const label = HttpStatus[status] ?? 'ERROR';
    return `CORE.HTTP.${label.toString().replace(/[^A-Z0-9]+/g, '_')}`;
  }
}
