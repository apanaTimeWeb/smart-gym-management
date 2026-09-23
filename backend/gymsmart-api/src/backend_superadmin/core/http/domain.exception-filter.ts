// RESPONSIBILITY: Converts controlled business errors and HTTP exceptions into the canonical API error envelope with localized messages.
// FLOW: Exception -> status/errorCode extraction -> i18n resolution -> ApiResponse<null>.
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ApiResponse } from '@/backend_superadmin/core/types/api-response.types';

interface ExceptionShape {
  getStatus?: () => number;
  getResponse?: () => unknown;
}

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

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  /** Serializes controlled errors without exposing internal details or leaking credentials. */
  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const response = host.switchToHttp().getResponse<Response>();
    const shape = this.exceptionShape(exception);
    const statusCode = this.resolveStatus(shape);
    const responseBody = this.responseBody(shape);
    const errorCode = this.resolveErrorCode(responseBody, statusCode);
    const errorName = this.resolveErrorName(responseBody);
    const message = await this.resolveMessage(responseBody.message, exception, requestLanguage(host), statusCode);
    response.status(statusCode).json(this.errorBody(message, errorName, errorCode, statusCode));
  }

  /** Resolves a framework exception shape without depending on concrete Nest exception classes. */
  private exceptionShape(exception: unknown): ExceptionShape {
    return typeof exception === 'object' && exception !== null ? exception as ExceptionShape : {};
  }

  /** Resolves the HTTP status using framework status accessors only. */
  private resolveStatus(shape: ExceptionShape): number {
    const status = shape.getStatus?.();
    return typeof status === 'number' ? status : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /** Reads a plain exception response body when the framework provides one. */
  private responseBody(shape: ExceptionShape): Record<string, unknown> {
    const value = shape.getResponse?.();
    return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {};
  }

  /** Resolves the machine-readable domain error code required by the frontend contract. */
  private resolveErrorCode(body: Record<string, unknown>, statusCode: number): string {
    return typeof body.errorCode === 'string' ? body.errorCode : statusCode >= HttpStatus.INTERNAL_SERVER_ERROR ? 'HTTP.SERVER.INTERNAL' : 'HTTP.REQUEST.FAILED';
  }

  /** Resolves the stable error category exposed in the canonical envelope. */
  private resolveErrorName(body: Record<string, unknown>): string {
    return typeof body.error === 'string' ? body.error : 'HTTP_ERROR';
  }

  /** Resolves a namespaced translation key while retaining a safe fallback. */
  private async resolveMessage(value: unknown, exception: unknown, lang: string, statusCode: number): Promise<string> {
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

  /** Builds the canonical error envelope. */
  private errorBody(message: string, error: string, errorCode: string, statusCode: number): ApiResponse<null> {
    return { success: false, message, data: null, error, errorCode, statusCode };
  }
}
