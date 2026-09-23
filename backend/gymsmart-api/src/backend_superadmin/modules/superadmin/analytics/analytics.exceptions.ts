// RESPONSIBILITY: Defines business-specific exceptions for the analytics feature.
// FLOW: Service -> AnalyticsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class AnalyticsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'ANALYTICS.RESOURCE.NOT_FOUND'; }
export class AnalyticsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'ANALYTICS.RESOURCE.CONFLICT'; }