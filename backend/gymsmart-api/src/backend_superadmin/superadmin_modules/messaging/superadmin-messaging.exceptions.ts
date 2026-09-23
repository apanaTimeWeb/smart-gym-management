// RESPONSIBILITY: Defines business-specific exceptions for the messaging feature.
// FLOW: Service -> SuperadminMessagingBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminMessagingNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'MESSAGING.RESOURCE.NOT_FOUND'; }
export class SuperadminMessagingBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'MESSAGING.RESOURCE.CONFLICT'; }