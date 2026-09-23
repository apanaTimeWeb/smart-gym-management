// RESPONSIBILITY: Defines business-specific exceptions for the plans feature.
// FLOW: Service -> PlansBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class PlansNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'PLANS.RESOURCE.NOT_FOUND'; }
export class PlansBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'PLANS.RESOURCE.CONFLICT'; }