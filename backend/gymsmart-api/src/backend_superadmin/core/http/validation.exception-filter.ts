// RESPONSIBILITY: Converts NestJS validation failures into the canonical localized field-aware API envelope.
// FLOW: BadRequestException -> validation error normalization -> i18n -> ApiResponse validationErrors shape.
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { ApiResponse, ValidationErrorItem } from '@/backend_superadmin/core/types/api-response.types';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  /** Writes the canonical validation response for DTO failures and localizes generic messages. */
  async catch(exception: BadRequestException, host: ArgumentsHost): Promise<void> {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<{ headers?: Record<string, string | string[] | undefined> }>();
    const header = request.headers?.['accept-language'];
    const language = (Array.isArray(header) ? header[0] : header)?.split(',')[0]?.trim() || 'en';
    const exceptionResponse = exception.getResponse();
    const raw = typeof exceptionResponse === 'object' && exceptionResponse !== null ? exceptionResponse as Record<string, unknown> : {};
    const rawMessage = raw.message;
    const isValidationPayload = Array.isArray(rawMessage) && rawMessage.every((item) => typeof item === 'string' || (item && typeof item === 'object'));
    if (!isValidationPayload) {
      const message = await this.translate('core.ERRORS.BAD_REQUEST', language);
      response.status(exception.getStatus()).json({ success: false, message, data: null, error: 'BAD_REQUEST', errorCode: typeof raw.errorCode === 'string' ? raw.errorCode : 'HTTP.BAD_REQUEST', statusCode: exception.getStatus() } satisfies ApiResponse<null>);
      return;
    }
    const validationErrors = this.flatten(rawMessage);
    const message = await this.translate('core.ERRORS.VALIDATION_FAILED', language);
    response.status(exception.getStatus()).json({ success: false, message, data: null, error: 'VALIDATION_ERROR', errorCode: 'VALIDATION.DTO.FAILED', statusCode: exception.getStatus(), validationErrors } satisfies ApiResponse<null>);
  }

  /** Flattens class-validator errors or Nest validation strings into stable field/message pairs. */
  private flatten(value: unknown, parentPath = ''): ValidationErrorItem[] {
    if (Array.isArray(value)) return value.flatMap((item) => this.flatten(item, parentPath));
    if (typeof value === 'string') {
      const separator = value.indexOf(' ');
      const rawField = separator > 0 ? value.slice(0, separator) : parentPath || 'unknown';
      const message = separator > 0 ? value.slice(separator + 1) : value;
      return [{ field: rawField || 'unknown', message }];
    }
    if (value && typeof value === 'object') {
      const error = value as ValidationError;
      const path = parentPath ? `${parentPath}.${error.property}` : error.property ?? parentPath;
      const own = error.constraints ? Object.values(error.constraints).map((message) => ({ field: path || 'unknown', message })) : [];
      return [...own, ...(error.children ?? []).flatMap((child: ValidationError) => this.flatten(child, path))];
    }
    return [{ field: parentPath || 'unknown', message: 'Invalid value' }];
  }

  /** Resolves a localized shared infrastructure message. */
  private async translate(key: string, language: string): Promise<string> {
    const value = await this.i18n.translate(key, { lang: language });
    return typeof value === 'string' ? value : String(value);
  }
}
