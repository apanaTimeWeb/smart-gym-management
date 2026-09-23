// RESPONSIBILITY: Defines business-specific exceptions for the compliance feature.
// FLOW: Service -> SuperadminComplianceBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminComplianceNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'COMPLIANCE.RESOURCE.NOT_FOUND'; }
export class SuperadminComplianceBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'COMPLIANCE.RESOURCE.CONFLICT'; }