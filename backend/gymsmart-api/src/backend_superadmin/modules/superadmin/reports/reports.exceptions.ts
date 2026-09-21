// RESPONSIBILITY: Defines business-specific exceptions for the reports feature.
// FLOW: Service -> ReportsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class ReportsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'REPORTS.RESOURCE.NOT_FOUND'; }
export class ReportsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'REPORTS.RESOURCE.CONFLICT'; }
