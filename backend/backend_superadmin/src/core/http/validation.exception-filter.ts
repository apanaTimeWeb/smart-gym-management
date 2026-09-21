// RESPONSIBILITY: Converts NestJS validation failures into the canonical API validation envelope.
// FLOW: BadRequestException -> validation parser -> ApiResponse validationErrors shape.
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ValidationErrorItem } from '@/core/types/api-response.types';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  /** Writes the canonical validation response for a DTO validation failure. */
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const raw = typeof exceptionResponse === 'object' && exceptionResponse !== null ? exceptionResponse : {};
    const messages = Array.isArray((raw as { message?: unknown }).message) ? (raw as { message: unknown[] }).message : [];
    const validationErrors: ValidationErrorItem[] = messages.flatMap((message) => this.parseMessage(message));
    const body: ApiResponse<null> = {
      success: false,
      message: 'Validation failed',
      data: null,
      error: 'VALIDATION_ERROR',
      errorCode: 'VALIDATION.DTO.FAILED',
      statusCode: exception.getStatus(),
      validationErrors,
    };
    response.status(exception.getStatus()).json(body);
  }

  /** Maps Nest validation strings into field/message pairs. */
  private parseMessage(message: unknown): ValidationErrorItem[] {
    if (typeof message !== 'string') return [{ field: 'unknown', message: 'Invalid value' }];
    const [field, ...rest] = message.split(' ');
    return [{ field: field || 'unknown', message: rest.join(' ') || message }];
  }
}
