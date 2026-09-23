// RESPONSIBILITY: Defines business-specific exceptions for the broadcasts feature.
// FLOW: Service -> SuperadminBroadcastsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminBroadcastsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'BROADCASTS.RESOURCE.NOT_FOUND'; }
export class SuperadminBroadcastsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'BROADCASTS.RESOURCE.CONFLICT'; }