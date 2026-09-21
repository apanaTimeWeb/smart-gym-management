// RESPONSIBILITY: Defines business-specific exceptions for the messaging feature.
// FLOW: Service -> MessagingBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class MessagingNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'MESSAGING.RESOURCE.NOT_FOUND'; }
export class MessagingBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'MESSAGING.RESOURCE.CONFLICT'; }
