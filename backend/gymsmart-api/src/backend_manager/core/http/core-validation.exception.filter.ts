// RESPONSIBILITY: Converts only tagged ValidationPipe failures into the canonical field-keyed 400 contract.
// FLOW: ValidationPipe exceptionFactory -> __validation marker -> canonical validationErrors envelope.
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import type { ValidationErrorItem } from '@/core/types/api-response.types';

interface ValidationPayload { __validation?: boolean; validationErrors?: ValidationErrorItem[]; }

@Catch(BadRequestException)
export class CoreValidationExceptionFilter implements ExceptionFilter {
  /** @description Formats a tagged DTO-validation failure and delegates all other 400 responses to the next exception layer. @param exception - Bad request exception. @param host - HTTP execution host. @returns Nothing after writing a validation response. */
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const raw = exception.getResponse();
    const body = typeof raw === 'object' && raw !== null ? raw as ValidationPayload : {};
    if (!body.__validation || !body.validationErrors) throw exception;
    const response = host.switchToHttp().getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed. Please check the highlighted fields.',
      data: null,
      error: 'VALIDATION_ERROR',
      errorCode: 'VALIDATION.DTO.FAILED',
      statusCode: HttpStatus.BAD_REQUEST,
      validationErrors: body.validationErrors,
    });
  }
}
