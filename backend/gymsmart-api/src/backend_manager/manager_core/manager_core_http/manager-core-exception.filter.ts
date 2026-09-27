// RESPONSIBILITY: Owns canonical non-validation HTTP error serialization.
// FLOW: Exception -> HTTP classification -> machine-readable ApiResponse error envelope.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { ManagerCoreI18nService } from '@/backend_manager/manager_core/manager_core_config/manager-core-i18n.service';

import type { Request, Response } from 'express';

@Catch()
export class ManagerCoreExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: ManagerCoreI18nService) {}
  /** @description Serializes unexpected and application HTTP errors without leaking sensitive internals. @param exception - Thrown application error. @param host - HTTP execution host. @returns Nothing after writing the response. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const httpException = exception instanceof HttpException ? exception : null;
    const exceptionResponse = httpException?.getResponse();
    const status = httpException?.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const body = typeof exceptionResponse === 'object' && exceptionResponse !== null ? exceptionResponse as Record<string, unknown> : {};
    if (body.__validation === true) return;
    const request = host.switchToHttp().getRequest<Request>();
    const locale = request.headers['accept-language'] ?? 'en';
    const errorCode = typeof body.errorCode === 'string' ? body.errorCode : status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'CORE.HTTP.INTERNAL_SERVER_ERROR' : 'CORE.HTTP.REQUEST_FAILED';
    const messageKey = typeof body.i18nKey === 'string' ? body.i18nKey : this.errorCodeToI18nKey(errorCode);
    const message = messageKey ? this.i18n.translate(messageKey, String(locale)) : (typeof body.message === 'string' ? body.message : status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal server error' : exception instanceof Error ? exception.message : 'Request failed');
    const error = typeof body.error === 'string' ? body.error : status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'INTERNAL_SERVER_ERROR' : 'HTTP_ERROR';
    response.status(status).json({ success: false, message, data: null, error, errorCode, statusCode: status });
  }

  /** @description Maps stable error codes to module-scoped translation keys. @param code - Machine-readable error code. @returns Translation key or undefined. */
  private errorCodeToI18nKey(code: string): string | undefined {
    const [module, entity, reason] = code.split('.');
    if (module === 'CORE' && entity === 'ENTITY' && reason === 'NOT_FOUND') return 'core.ERRORS.NOT_FOUND';
    if (module === 'CORE' && entity === 'RESOURCE' && reason === 'ID_REQUIRED') return 'core.ERRORS.RESOURCE_ID_REQUIRED';
    if (module === 'CORE' && entity === 'TRANSACTION' && reason === 'NO_RESULT') return 'core.ERRORS.TRANSACTION_NO_RESULT';
    if (module === 'CORE' && entity === 'MONEY' && reason === 'INVALID') return 'core.ERRORS.MONEY_INVALID';
    if (module === 'CORE' && entity === 'SECURITY' && reason === 'ENCRYPTION_KEY_INVALID') return 'core.ERRORS.ENCRYPTION_KEY_INVALID';
    if (module === 'CORE' && entity === 'SECURITY' && reason === 'ENCRYPTED_VALUE_INVALID') return 'core.ERRORS.ENCRYPTED_VALUE_INVALID';
    if (module === 'CORE' && entity === 'CIRCUIT' && reason === 'OPEN') return 'core.ERRORS.CIRCUIT_OPEN';
    if (module === 'CORE' && entity === 'QUERY' && reason === 'UNSUPPORTED') return 'core.ERRORS.UNSUPPORTED_QUERY';
    if (module === 'COMMUNICATIONS' && entity === 'PROVIDER' && reason === 'NOT_CONFIGURED') return 'communications.ERRORS.PROVIDER_NOT_CONFIGURED';
    if (module === 'COMMUNICATIONS' && entity === 'PROVIDER' && reason === 'HTTP_FAILURE') return 'communications.ERRORS.PROVIDER_HTTP_FAILURE';
    if (module === 'PLANS' && entity === 'MEMBERSHIP' && reason === 'INPUT_INVALID') return 'plans.ERRORS.MEMBERSHIP_INPUT_INVALID';
    if (module === 'PLANS' && entity === 'MEMBERSHIP' && reason === 'ALREADY_ACTIVE') return 'plans.ERRORS.MEMBERSHIP_ALREADY_ACTIVE';
    if (module === 'REFERRALS' && entity === 'REWARD' && reason === 'CLAIMED') return 'referrals.ERRORS.REWARD_ALREADY_CLAIMED';
    if (module === 'REFERRALS' && entity === 'REWARD' && reason === 'INELIGIBLE') return 'referrals.ERRORS.REWARD_NOT_ELIGIBLE';
    if (module === 'HR' && entity === 'PAYROLL' && reason === 'MONTH_INVALID') return 'hr.ERRORS.PAYROLL_MONTH_INVALID';
    if (module === 'HR' && entity === 'LEDGER' && reason === 'INPUT_INVALID') return 'hr.ERRORS.LEDGER_INPUT_INVALID';
    if (module === 'HR' && entity === 'LEDGER' && reason === 'EXCEEDS_DUE') return 'hr.ERRORS.LEDGER_EXCEEDS_DUE';
    if (module === 'PT' && entity === 'ASSIGNMENT' && reason === 'ID_REQUIRED') return 'pt.ERRORS.ASSIGNMENT_ID_REQUIRED';
    return undefined;
  }
}
