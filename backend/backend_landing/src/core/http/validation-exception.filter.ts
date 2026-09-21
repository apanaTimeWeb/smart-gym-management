// RESPONSIBILITY: Converts all HTTP exceptions into the canonical response envelope and normalizes validation errors.
// FLOW: Pipe/service exception → ValidationExceptionFilter → canonical ApiResponse<null>.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import type { ApiResponse, ValidationErrorItem } from '@/core/types/api-response.types';

interface ValidationPayload {
  message?: string | string[];
  success?: boolean;
  data?: null;
  error?: string;
  errorCode?: string;
  statusCode?: number;
  validationErrors?: ValidationErrorItem[];
}

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  /** @description Converts thrown HTTP errors into the canonical response envelope. @param exception - Thrown application/framework error. @param host - Nest HTTP arguments host. @returns Nothing. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = this.resolveStatus(exception);
    response.status(status).json(this.buildPayload(exception, status));
  }

  /** @description Resolves the HTTP status for an exception. @param exception - Candidate exception. @returns HTTP status code. */
  private resolveStatus(exception: unknown): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /** @description Builds a canonical success-independent error envelope. @param exception - Source exception. @param statusCode - Resolved status. @returns Canonical error response. */
  private buildPayload(exception: unknown, statusCode: number): ApiResponse<null> {
    const source = this.resolveResponse(exception);
    if (this.isCanonical(source)) return { ...source, statusCode };
    if (statusCode === HttpStatus.BAD_REQUEST) return this.buildValidationPayload(source);
    return {
      success: false,
      message: this.extractMessage(source),
      data: null,
      error: source?.error ?? 'HTTP_ERROR',
      errorCode: source?.errorCode ?? 'CORE.HTTP.REQUEST_FAILED',
      statusCode,
    };
  }

  /** @description Extracts an HttpException response into a typed intermediate payload. @param exception - Source exception. @returns Normalized payload or null. */
  private resolveResponse(exception: unknown): ValidationPayload | null {
    if (!(exception instanceof HttpException)) return null;
    const source = exception.getResponse();
    return typeof source === 'string' ? { message: source } : source as ValidationPayload;
  }

  /** @description Detects an already canonical error response. @param value - Intermediate payload. @returns True when it is canonical. */
  private isCanonical(value: ValidationPayload | null): value is ApiResponse<null> {
    return Boolean(value && value.success === false && value.data === null);
  }

  /** @description Converts Nest validation messages into the required validationErrors array. @param source - Validation exception payload. @returns Canonical validation error response. */
  private buildValidationPayload(source: ValidationPayload | null): ApiResponse<null> {
    const messages = Array.isArray(source?.message) ? source.message : [source?.message ?? 'Invalid request.'];
    return {
      success: false,
      message: 'Please check the submitted form fields.',
      data: null,
      error: 'VALIDATION_ERROR',
      errorCode: 'VALIDATION.DTO.FAILED',
      statusCode: HttpStatus.BAD_REQUEST,
      validationErrors: messages.map((message) => ({
        field: this.extractField(message),
        message,
      })),
    };
  }

  /** @description Extracts a human-readable error message. @param source - Intermediate exception payload. @returns Human-readable message. */
  private extractMessage(source: ValidationPayload | null): string {
    if (Array.isArray(source?.message)) return source.message.join(', ');
    return source?.message ?? 'Request failed.';
  }

  /** @description Extracts the first token as a best-effort field name for class-validator messages. @param message - Validation message. @returns Field token. */
  private extractField(message: string): string {
    return message.split(' ')[0] ?? 'request';
  }
}
