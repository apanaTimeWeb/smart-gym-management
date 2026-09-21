// RESPONSIBILITY: Defines business-specific exceptions for the white-labeling feature.
// FLOW: Service -> WhiteLabelingBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class WhiteLabelingNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'WHITE_LABELING.RESOURCE.NOT_FOUND'; }
export class WhiteLabelingBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'WHITE_LABELING.RESOURCE.CONFLICT'; }
