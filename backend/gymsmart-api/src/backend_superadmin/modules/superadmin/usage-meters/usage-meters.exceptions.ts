// RESPONSIBILITY: Defines business-specific exceptions for the usage-meters feature.
// FLOW: Service -> UsageMetersBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class UsageMetersNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'USAGE_METERS.RESOURCE.NOT_FOUND'; }
export class UsageMetersBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'USAGE_METERS.RESOURCE.CONFLICT'; }
