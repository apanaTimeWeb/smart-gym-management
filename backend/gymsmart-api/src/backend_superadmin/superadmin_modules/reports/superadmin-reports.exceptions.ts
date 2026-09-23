// RESPONSIBILITY: Defines business-specific exceptions for the reports feature.
// FLOW: Service -> SuperadminReportsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminReportsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'REPORTS.RESOURCE.NOT_FOUND'; }
export class SuperadminReportsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'REPORTS.RESOURCE.CONFLICT'; }