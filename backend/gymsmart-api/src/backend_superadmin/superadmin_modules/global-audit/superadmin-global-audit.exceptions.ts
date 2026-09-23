// RESPONSIBILITY: Defines business-specific exceptions for the global-audit feature.
// FLOW: Service -> SuperadminGlobalAuditBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminGlobalAuditNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'GLOBAL_AUDIT.RESOURCE.NOT_FOUND'; }
export class SuperadminGlobalAuditBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'GLOBAL_AUDIT.RESOURCE.CONFLICT'; }