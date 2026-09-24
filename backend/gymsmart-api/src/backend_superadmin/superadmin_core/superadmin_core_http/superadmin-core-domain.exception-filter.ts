// RESPONSIBILITY: Converts controlled business errors and HTTP exceptions into the canonical API error envelope with localized messages.
// FLOW: Exception -> status/errorCode extraction -> i18n resolution -> ApiResponse<null>.
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ApiResponse } from '@/backend_superadmin/superadmin_core/superadmin_core_types/superadmin-core-api-response.types';

/**
 * Primary Intent: Defines the ExceptionShape type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ExceptionShape {
  translationKey?: unknown;
  getStatus?: () => number;
  getResponse?: () => unknown;
  statusCode?: unknown;
  errorCode?: unknown;
  message?: unknown;
}

/**
 * Primary Intent: Defines the TranslationMessage type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface TranslationMessage {
  key?: string;
}

function requestLanguage(host: ArgumentsHost): string {
  const request = host.switchToHttp().getRequest<{ headers?: Record<string, string | string[] | undefined> }>();
  const header = request.headers?.['accept-language'];
  const raw = Array.isArray(header) ? header[0] : header;
  return raw?.split(',')[0]?.trim() || 'en';
}

function isTranslationMessage(value: unknown): value is TranslationMessage {
  return typeof value === 'object' && value !== null && typeof (value as TranslationMessage).key === 'string';
}

/**
 * Primary Intent: Defines SuperadminCoreDomainExceptionFilter as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Catch()
export class SuperadminCoreDomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  /**
 * Primary Intent: Executes the catch use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const response = host.switchToHttp().getResponse<Response>();
    const shape = this.exceptionShape(exception);
    const statusCode = this.resolveStatus(shape);
    const responseBody = this.responseBody(shape);
    const errorCode = this.resolveErrorCode(responseBody, statusCode);
    const errorName = this.resolveErrorName(responseBody);
    const message = await this.resolveMessage(responseBody.message, shape.translationKey, requestLanguage(host), statusCode);
    response.status(statusCode).json(this.errorBody(message, errorName, errorCode, statusCode));
  }

  /**
 * Primary Intent: Executes the exceptionShape use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private exceptionShape(exception: unknown): ExceptionShape {
    return typeof exception === 'object' && exception !== null ? exception as ExceptionShape : {};
  }

  /**
 * Primary Intent: Executes the resolveStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private resolveStatus(shape: ExceptionShape): number {
    const status = shape.getStatus?.();
    if (typeof status === 'number') return status;
    return typeof shape.statusCode === 'number' ? shape.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
 * Primary Intent: Executes the responseBody use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private responseBody(shape: ExceptionShape): Record<string, unknown> {
    const value = shape.getResponse?.();
    if (typeof value === 'object' && value !== null) return value as Record<string, unknown>;
    return {
      errorCode: typeof shape.errorCode === 'string' ? shape.errorCode : undefined,
      message: typeof shape.message === 'string' ? shape.message : undefined,
    };
  }

  /**
 * Primary Intent: Executes the resolveErrorCode use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private resolveErrorCode(body: Record<string, unknown>, statusCode: number): string {
    return typeof body.errorCode === 'string' ? body.errorCode : statusCode >= HttpStatus.INTERNAL_SERVER_ERROR ? 'HTTP.SERVER.INTERNAL' : 'HTTP.REQUEST.FAILED';
  }

  /**
 * Primary Intent: Executes the resolveErrorName use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private resolveErrorName(body: Record<string, unknown>): string {
    return typeof body.error === 'string' ? body.error : 'HTTP_ERROR';
  }

  /**
 * Primary Intent: Executes the resolveMessage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async resolveMessage(value: unknown, translationKey: unknown, lang: string, statusCode: number): Promise<string> {
    if (typeof translationKey === 'string') {
      const translated = await this.i18n.translate(translationKey, { lang });
      if (typeof translated === 'string') return translated;
    }
    if (isTranslationMessage(value)) {
      const translated = await this.i18n.translate(value.key as string, { lang });
      return typeof translated === 'string' ? translated : String(translated);
    }
    if (typeof value === 'string') return value;
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const translated = await this.i18n.translate('core.ERRORS.INTERNAL', { lang });
      return typeof translated === 'string' ? translated : String(translated);
    }
    const translated = await this.i18n.translate('core.ERRORS.BAD_REQUEST', { lang });
    return typeof translated === 'string' ? translated : String(translated);
  }

  /**
 * Primary Intent: Executes the errorBody use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private errorBody(message: string, error: string, errorCode: string, statusCode: number): ApiResponse<null> {
    return { success: false, message, data: null, error, errorCode, statusCode };
  }
}
