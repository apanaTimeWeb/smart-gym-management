// RESPONSIBILITY: Defines business-specific exceptions for the broadcasts feature.
// FLOW: Service -> BroadcastsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class BroadcastsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'BROADCASTS.RESOURCE.NOT_FOUND'; }
export class BroadcastsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'BROADCASTS.RESOURCE.CONFLICT'; }