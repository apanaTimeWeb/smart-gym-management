// RESPONSIBILITY: Converts all HTTP exceptions into the canonical response envelope and normalizes validation errors.
// FLOW: Pipe/service exception â†’ LandingValidationExceptionFilter â†’ canonical LandingApiResponse<null>.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import type { Response } from 'express';
import type { LandingApiResponse, LandingValidationErrorItem } from '@/backend_landing/landing_core/landing_types/landing-api-response.types';


interface ValidationPayload {
  message?: string | string[];
  success?: boolean;
  data?: null;
  error?: string;
  errorCode?: string;
  statusCode?: number;
  validationErrors?: LandingValidationErrorItem[];
}

/**
 * Intent: Defines the LandingValidationExceptionFilter class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Catch()
/**
 * Intent: Defines the landing validation exception filter boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingValidationExceptionFilter implements ExceptionFilter {
  /** @description Converts thrown HTTP errors into the canonical response envelope. @param exception - Thrown application/framework error. @param host - Nest HTTP arguments host. @returns Nothing. */
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.catch at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = this.resolveStatus(exception);
    response.status(status).json(this.buildPayload(exception, status));
  }

  /** @description Resolves the HTTP status for an exception. @param exception - Candidate exception. @returns HTTP status code. */
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.resolveStatus at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private resolveStatus(exception: unknown): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /** @description Builds a canonical success-independent error envelope. @param exception - Source exception. @param statusCode - Resolved status. @returns Canonical error response. */
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.buildPayload at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private buildPayload(exception: unknown, statusCode: number): LandingApiResponse<null> {
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
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.resolveResponse at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private resolveResponse(exception: unknown): ValidationPayload | null {
    if (!(exception instanceof HttpException)) return null;
    const source = exception.getResponse();
    return typeof source === 'string' ? { message: source } : source as ValidationPayload;
  }

  /** @description Detects an already canonical error response. @param value - Intermediate payload. @returns True when it is canonical. */
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.isCanonical at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private isCanonical(value: ValidationPayload | null): value is LandingApiResponse<null> {
    return Boolean(
      value &&
      value.success === false &&
      value.data === null &&
      typeof value.error === 'string' &&
      typeof value.errorCode === 'string' &&
      typeof value.statusCode === 'number',
    );
  }

  /** @description Converts Nest validation messages into the required validationErrors array. @param source - Validation exception payload. @returns Canonical validation error response. */
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.buildValidationPayload at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private buildValidationPayload(source: ValidationPayload | null): LandingApiResponse<null> {
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
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.extractMessage at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private extractMessage(source: ValidationPayload | null): string {
    if (Array.isArray(source?.message)) return source.message.join(', ');
    return source?.message ?? 'Request failed.';
  }

  /** @description Extracts the first token as a best-effort field name for class-validator messages. @param message - Validation message. @returns Field token. */
  
  /**
   * Intent: Preserve the single responsibility of landing-validation-exception.filter.extractField at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private extractField(message: string): string {
    return message.split(' ')[0] ?? 'request';
  }
}
