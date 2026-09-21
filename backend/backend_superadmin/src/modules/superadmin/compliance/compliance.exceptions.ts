// RESPONSIBILITY: Defines business-specific exceptions for the compliance feature.
// FLOW: Service -> ComplianceBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class ComplianceNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'COMPLIANCE.RESOURCE.NOT_FOUND'; }
export class ComplianceBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'COMPLIANCE.RESOURCE.CONFLICT'; }
