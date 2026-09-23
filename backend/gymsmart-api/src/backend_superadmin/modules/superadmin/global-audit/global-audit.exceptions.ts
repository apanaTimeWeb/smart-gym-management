// RESPONSIBILITY: Defines business-specific exceptions for the global-audit feature.
// FLOW: Service -> GlobalAuditBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class GlobalAuditNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'GLOBAL_AUDIT.RESOURCE.NOT_FOUND'; }
export class GlobalAuditBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'GLOBAL_AUDIT.RESOURCE.CONFLICT'; }