// RESPONSIBILITY: Defines business-specific exceptions for the backups feature.
// FLOW: Service -> SuperadminBackupsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminBackupsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'BACKUPS.RESOURCE.NOT_FOUND'; }
export class SuperadminBackupsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'BACKUPS.RESOURCE.CONFLICT'; }