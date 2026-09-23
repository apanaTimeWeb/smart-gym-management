// RESPONSIBILITY: Defines business-specific exceptions for the settings feature.
// FLOW: Service -> SettingsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SettingsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'SETTINGS.RESOURCE.NOT_FOUND'; }
export class SettingsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'SETTINGS.RESOURCE.CONFLICT'; }