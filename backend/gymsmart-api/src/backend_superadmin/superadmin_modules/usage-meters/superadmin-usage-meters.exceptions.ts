// RESPONSIBILITY: Defines business-specific exceptions for the usage-meters feature.
// FLOW: Service -> SuperadminUsageMetersBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminUsageMetersNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'USAGE_METERS.RESOURCE.NOT_FOUND'; }
export class SuperadminUsageMetersBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'USAGE_METERS.RESOURCE.CONFLICT'; }