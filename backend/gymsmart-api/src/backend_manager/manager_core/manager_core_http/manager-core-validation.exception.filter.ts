// RESPONSIBILITY: Serializes strict DTO-validation failures into the canonical 400 response contract.
// FLOW: BadRequestException -> validation marker -> ApiResponse validation envelope.
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { ManagerCoreI18nService } from '@/backend_manager/manager_core/manager_core_config/manager-core-i18n.service';

import type { ValidationErrorItem } from '@/backend_manager/manager_core/manager_core_types/manager-core-api-response.types';
import type { Request, Response } from 'express';

interface ValidationPayload { __validation?: boolean; validationErrors?: ValidationErrorItem[]; }

@Catch(BadRequestException)
export class ManagerCoreValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: ManagerCoreI18nService) {}
  /** @description Formats strict DTO validation failures and rethrows ordinary 400 application errors. @param exception - Nest bad-request exception. @param host - HTTP execution host. @returns Nothing after writing a validation response. */
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const raw = exception.getResponse();
    const body = typeof raw === 'object' && raw !== null ? raw as ValidationPayload : {};
    if (!body.__validation || !body.validationErrors) throw exception;
    const response = host.switchToHttp().getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: this.i18n.translate('core.ERRORS.VALIDATION_FAILED', String(host.switchToHttp().getRequest<Request>().headers['accept-language'] ?? 'en')),
      data: null,
      error: 'VALIDATION_ERROR',
      errorCode: 'VALIDATION.DTO.FAILED',
      statusCode: HttpStatus.BAD_REQUEST,
      validationErrors: body.validationErrors,
    });
  }
}
