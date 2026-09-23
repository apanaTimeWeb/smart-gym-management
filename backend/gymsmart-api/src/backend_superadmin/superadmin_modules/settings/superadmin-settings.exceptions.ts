// RESPONSIBILITY: Defines business-specific exceptions for the settings feature.
// FLOW: Service -> SuperadminSettingsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminSettingsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'SETTINGS.RESOURCE.NOT_FOUND'; }
export class SuperadminSettingsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'SETTINGS.RESOURCE.CONFLICT'; }