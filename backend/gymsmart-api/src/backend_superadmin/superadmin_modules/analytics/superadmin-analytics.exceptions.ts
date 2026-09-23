// RESPONSIBILITY: Defines business-specific exceptions for the analytics feature.
// FLOW: Service -> SuperadminAnalyticsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminAnalyticsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'ANALYTICS.RESOURCE.NOT_FOUND'; }
export class SuperadminAnalyticsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'ANALYTICS.RESOURCE.CONFLICT'; }