// RESPONSIBILITY: Defines business-specific exceptions for the plans feature.
// FLOW: Service -> SuperadminPlansBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminPlansNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'PLANS.RESOURCE.NOT_FOUND'; }
export class SuperadminPlansBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'PLANS.RESOURCE.CONFLICT'; }