// RESPONSIBILITY: Transforms validation failures into the canonical eight-field API envelope.
// FLOW: BadRequest validation error → class-validator error tree → canonical validation response.

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import type { ValidationError } from 'class-validator';
import type { CoreApiResponse, ValidationErrorItem } from '@/backend_trainer/core/types/core-api-response.types';

@Catch(HttpException)
export class CoreValidationExceptionFilter implements ExceptionFilter {
  /** Formats a Nest validation exception into stable field-level error entries. */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    if (exception.getStatus() !== HttpStatus.BAD_REQUEST) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }
    const raw = exception.getResponse();
    const message = typeof raw === 'object' && raw !== null && 'message' in raw ? (raw as { message?: unknown }).message : raw;
    const validationErrors = this.toFieldErrors(message);
    const payload: CoreApiResponse<null> = { success: false, message: 'Validation failed', data: null, error: 'VALIDATION_ERROR', errorCode: 'VALIDATION.DTO.FAILED', statusCode: HttpStatus.BAD_REQUEST, validationErrors };
    response.status(HttpStatus.BAD_REQUEST).json(payload);
  }

  /** Flattens nested class-validator trees into exact property paths. */
  private toFieldErrors(value: unknown): ValidationErrorItem[] {
    if (!Array.isArray(value)) return [{ field: 'unknown', message: String(value) }];
    return value.flatMap((item: unknown) => typeof item === 'string' ? [{ field: 'unknown', message: item }] : this.flatten(item as ValidationError));
  }

  /** Converts one validation tree node to field/message pairs. */
  private flatten(error: ValidationError, parentPath = ''): ValidationErrorItem[] {
    const path = parentPath ? `${parentPath}.${error.property}` : error.property;
    const own = Object.values(error.constraints ?? {}).map((message: unknown) => ({ field: path, message: String(message) }));
    const nested = (error.children ?? []).flatMap((child: ValidationError) => this.flatten(child, path));
    return [...own, ...nested];
  }
}
