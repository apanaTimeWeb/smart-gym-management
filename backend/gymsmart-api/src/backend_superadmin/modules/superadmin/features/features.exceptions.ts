// RESPONSIBILITY: Defines business-specific exceptions for the features feature.
// FLOW: Service -> FeaturesBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class FeaturesNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'FEATURES.RESOURCE.NOT_FOUND'; }
export class FeaturesBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'FEATURES.RESOURCE.CONFLICT'; }
