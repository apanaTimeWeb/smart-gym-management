// RESPONSIBILITY: Defines business-specific exceptions for the invoices feature.
// FLOW: Service -> InvoicesBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class InvoicesNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'INVOICES.RESOURCE.NOT_FOUND'; }
export class InvoicesBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'INVOICES.RESOURCE.CONFLICT'; }
