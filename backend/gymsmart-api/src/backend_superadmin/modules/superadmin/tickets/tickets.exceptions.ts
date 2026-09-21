// RESPONSIBILITY: Defines business-specific exceptions for the tickets feature.
// FLOW: Service -> TicketsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class TicketsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'TICKETS.RESOURCE.NOT_FOUND'; }
export class TicketsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'TICKETS.RESOURCE.CONFLICT'; }
