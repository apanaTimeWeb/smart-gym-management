// RESPONSIBILITY: Defines business-specific exceptions for the backups feature.
// FLOW: Service -> BackupsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class BackupsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'BACKUPS.RESOURCE.NOT_FOUND'; }
export class BackupsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'BACKUPS.RESOURCE.CONFLICT'; }
