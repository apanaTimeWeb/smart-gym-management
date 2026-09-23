// RESPONSIBILITY: Defines business-specific exceptions for the features feature.
// FLOW: Service -> SuperadminFeaturesBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminFeaturesNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'FEATURES.RESOURCE.NOT_FOUND'; }
export class SuperadminFeaturesBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'FEATURES.RESOURCE.CONFLICT'; }