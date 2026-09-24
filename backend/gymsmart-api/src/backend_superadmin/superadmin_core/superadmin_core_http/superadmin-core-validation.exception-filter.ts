// RESPONSIBILITY: Converts genuine NestJS DTO validation failures into the canonical localized field-aware API envelope.
// FLOW: BadRequestException -> validation-payload detection -> validation normalization OR business-error preservation.
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { ApiResponse, SuperadminValidationErrorItem } from '@/backend_superadmin/superadmin_core/superadmin_core_types/superadmin-core-api-response.types';
import { SUPERADMIN_CORE_VALIDATION_MESSAGES } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminCoreValidationExceptionFilter as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Catch(BadRequestException)
export class SuperadminCoreValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  /**
   * Primary Intent: Normalize only genuine DTO validation failures while preserving business-level 400 errors unchanged in the canonical envelope.
   * Edge Cases: Nest validation emits a message array; domain commands may also throw BadRequestException with scalar/object messages and distinct error codes.
   * Side-Effects: Writes one HTTP response and performs locale lookup for human-readable validation messages.
   * AI-Note: Never classify a business error as VALIDATION.DTO.FAILED merely because it uses HTTP 400.
   */
  /**
   * Primary Intent: Executes the catch use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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
      const message = await this.resolveMessage(raw.message ?? exception.message, language);
      const error = typeof raw.error === 'string' ? raw.error : 'BAD_REQUEST';
      const errorCode = typeof raw.errorCode === 'string' ? raw.errorCode : 'HTTP.BAD_REQUEST';
      response.status(exception.getStatus()).json({ success: false, message, data: null, error, errorCode, statusCode: exception.getStatus() } satisfies ApiResponse<null>);
      return;
    }

    const validationErrors = this.flatten(rawMessage);
    const message = await this.translate('core.ERRORS.VALIDATION_FAILED', language);
    response.status(exception.getStatus()).json({ success: false, message, data: null, error: 'VALIDATION_ERROR', errorCode: 'VALIDATION.DTO.FAILED', statusCode: exception.getStatus(), validationErrors } satisfies ApiResponse<null>);
  }

  /**
   * Primary Intent: Flattens class-validator trees into stable field/message pairs.
   * Edge Cases: Nested validation uses dot-notation and plain-string messages are retained without inventing a field.
   * Side-Effects: None.
   * AI-Note: Keep field paths aligned with DTO property names used by the frontend.
   */
  /**
   * Primary Intent: Executes the flatten use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private flatten(value: unknown, parentPath = ''): SuperadminValidationErrorItem[] {
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
    return [{ field: parentPath || 'unknown', message: SUPERADMIN_CORE_VALIDATION_MESSAGES.INVALID_VALUE }];
  }

  /**
   * Primary Intent: Resolves domain-provided localized message keys or plain strings without changing the original error category.
   * Edge Cases: Object messages from Nest remain a stable JSON string when a translated key cannot be resolved.
   * Side-Effects: Reads locale data only.
   * AI-Note: This helper is for human-readable text only; machine errorCode is preserved separately.
   */
  /**
   * Primary Intent: Executes the resolveMessage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async resolveMessage(value: unknown, language: string): Promise<string> {
    if (typeof value === 'object' && value !== null && 'key' in value && typeof (value as { key?: unknown }).key === 'string') return this.translate((value as { key: string }).key, language);
    if (typeof value === 'string') return value;
    return JSON.stringify(value ?? 'Bad request');
  }

  /**
   * Primary Intent: Resolves a localized infrastructure message.
   * Edge Cases: I18n adapters may return non-string values; those values are stringified deterministically.
   * Side-Effects: Reads locale resources.
   * AI-Note: Keep error translation centralized in infrastructure.
   */
  /**
   * Primary Intent: Executes the translate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async translate(key: string, language: string): Promise<string> {
    const value = await this.i18n.translate(key, { lang: language });
    return typeof value === 'string' ? value : String(value);
  }
}
