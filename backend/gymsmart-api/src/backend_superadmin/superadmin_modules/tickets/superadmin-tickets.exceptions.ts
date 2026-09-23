// RESPONSIBILITY: Defines business-specific exceptions for the tickets feature.
// FLOW: Service -> SuperadminTicketsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminTicketsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'TICKETS.RESOURCE.NOT_FOUND'; }
export class SuperadminTicketsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'TICKETS.RESOURCE.CONFLICT'; }