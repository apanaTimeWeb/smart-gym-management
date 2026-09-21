// RESPONSIBILITY: Converts typed application, HTTP and validation failures into the canonical API error envelope.
// FLOW: ValidationPipe/controller/service -> CoreValidationExceptionFilter -> ApiResponse<null>.

import { BadRequestException, Catch, HttpException, HttpStatus } from '@nestjs/common';

import { CoreErrorConstants } from '@/core/constants/core-error.constants';
import { CoreAppException } from '@/core/exceptions/core-app.exception';

import type { ApiResponse } from '@/core/types/api-response.types';
import type { ValidationErrorItem } from '@/core/types/validation-error.types';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import type { Response } from 'express';
@Catch()
export class CoreValidationExceptionFilter implements ExceptionFilter {
  /** @description Formats validation, typed application, HTTP and unknown errors consistently. @param exception - Raised error. @param host - HTTP argument host. @returns void. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const resolved = this.resolve(exception);
    response.status(resolved.statusCode).json(resolved.body);
  }

  /** @description Resolves one thrown value into an HTTP status and canonical error envelope. @param exception - Raised error. @returns Resolved status and response body. */
  private resolve(exception: unknown): { statusCode: number; body: ApiResponse<null> } {
    if (exception instanceof CoreAppException) return this.appExceptionResponse(exception);
    if (exception instanceof BadRequestException) return this.resolveBadRequest(exception);
    if (exception instanceof HttpException) return this.httpExceptionResponse(exception);
    return this.internalErrorResponse();
  }

  /** @description Converts a typed application exception into the canonical envelope. @param exception - Application exception. @returns Resolved status and body. */
  private appExceptionResponse(exception: CoreAppException): { statusCode: number; body: ApiResponse<null> } {
    return {
      statusCode: exception.statusCode,
      body: {
        success: false,
        message: exception.message,
        data: null,
        error: exception.error,
        errorCode: exception.errorCode,
        statusCode: exception.statusCode,
      },
    };
  }

  /** @description Converts a Nest bad-request error into the structured validation contract. @param exception - Bad-request exception. @returns Resolved status and body. */
  private resolveBadRequest(exception: BadRequestException): { statusCode: number; body: ApiResponse<null> } {
    const raw = exception.getResponse();
    const responseObject = typeof raw === 'object' && raw !== null ? raw as { message?: unknown } : {};
    const validationErrors = this.extractValidationErrors(responseObject.message);
    if (!validationErrors.length) return this.httpExceptionResponse(exception);
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: {
        success: false,
        message: 'Validation failed. Please check the highlighted fields.',
        data: null,
        error: CoreErrorConstants.NAME.VALIDATION,
        errorCode: CoreErrorConstants.CODE.VALIDATION_DTO_FAILED,
        statusCode: HttpStatus.BAD_REQUEST,
        validationErrors,
      },
    };
  }

  /** @description Extracts flat field errors from class-validator trees or legacy message strings. @param rawMessage - Raw exception message payload. @returns Canonical field/message pairs. */
  private extractValidationErrors(rawMessage: unknown): ValidationErrorItem[] {
    if (!Array.isArray(rawMessage)) return [];
    if (rawMessage.every((item): item is ValidationError => this.isValidationError(item))) return this.flattenValidationErrors(rawMessage);
    return rawMessage.filter((item): item is string => typeof item === 'string').map((message) => ({ field: message.split(' ')[0] || 'request', message }));
  }

  /** @description Determines whether a value is a class-validator ValidationError tree node. @param value - Candidate value. @returns True when the value has validation-error structure. */
  private isValidationError(value: unknown): value is ValidationError {
    return typeof value === 'object' && value !== null && 'property' in value && ('constraints' in value || 'children' in value);
  }

  /** @description Flattens nested validation errors into DTO property paths. @param errors - Validation error trees. @param parentPath - Parent DTO path. @returns Flat validation field errors. */
  private flattenValidationErrors(errors: ValidationError[], parentPath = ''): ValidationErrorItem[] {
    const flattened: ValidationErrorItem[] = [];
    for (const error of errors) {
      const field = parentPath ? `${parentPath}.${error.property}` : error.property;
      for (const message of Object.values(error.constraints ?? {})) flattened.push({ field, message });
      if (error.children?.length) flattened.push(...this.flattenValidationErrors(error.children, field));
    }
    return flattened;
  }

  /** @description Converts generic Nest HTTP exceptions while preserving their HTTP status. @param exception - HTTP exception. @returns Resolved status and body. */
  private httpExceptionResponse(exception: HttpException): { statusCode: number; body: ApiResponse<null> } {
    const statusCode = exception.getStatus();
    return {
      statusCode,
      body: {
        success: false,
        message: exception.message,
        data: null,
        error: this.errorName(statusCode),
        errorCode: this.errorCode(statusCode),
        statusCode,
      },
    };
  }

  /** @description Produces the safe fallback envelope for unknown errors. @returns Internal-error status and body. */
  private internalErrorResponse(): { statusCode: number; body: ApiResponse<null> } {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        success: false,
        message: 'An unexpected error occurred.',
        data: null,
        error: CoreErrorConstants.NAME.INTERNAL_ERROR,
        errorCode: 'CORE.INTERNAL.ERROR',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    };
  }

  /** @description Maps HTTP status codes to machine-readable domain-style error codes. @param statusCode - HTTP status. @returns Stable error code. */
  private errorCode(statusCode: number): string {
    const codes: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'CORE.HTTP.BAD_REQUEST',
      [HttpStatus.UNAUTHORIZED]: 'CORE.HTTP.UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'CORE.HTTP.FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'CORE.HTTP.NOT_FOUND',
      [HttpStatus.CONFLICT]: 'CORE.HTTP.CONFLICT',
      [HttpStatus.TOO_MANY_REQUESTS]: 'CORE.HTTP.TOO_MANY_REQUESTS',
      [HttpStatus.REQUEST_TIMEOUT]: 'CORE.HTTP.REQUEST_TIMEOUT',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'CORE.HTTP.SERVICE_UNAVAILABLE',
      [HttpStatus.LOCKED]: 'CORE.HTTP.LOCKED',
    };
    return codes[statusCode] ?? CoreErrorConstants.CODE.INTERNAL_ERROR;
  }

  /** @description Maps HTTP status codes to stable error categories for generic Nest exceptions. @param statusCode - HTTP status. @returns Stable error category. */
  private errorName(statusCode: number): string {
    const names: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: CoreErrorConstants.NAME.BAD_REQUEST,
      [HttpStatus.UNAUTHORIZED]: CoreErrorConstants.NAME.UNAUTHORIZED,
      [HttpStatus.FORBIDDEN]: CoreErrorConstants.NAME.FORBIDDEN,
      [HttpStatus.NOT_FOUND]: CoreErrorConstants.NAME.NOT_FOUND,
      [HttpStatus.CONFLICT]: CoreErrorConstants.NAME.CONFLICT,
      [HttpStatus.TOO_MANY_REQUESTS]: CoreErrorConstants.NAME.TOO_MANY_REQUESTS,
      [HttpStatus.REQUEST_TIMEOUT]: 'REQUEST_TIMEOUT',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
      [HttpStatus.LOCKED]: 'ACCOUNT_LOCKED',
    };
    return names[statusCode] ?? CoreErrorConstants.NAME.INTERNAL_ERROR;
  }
}
