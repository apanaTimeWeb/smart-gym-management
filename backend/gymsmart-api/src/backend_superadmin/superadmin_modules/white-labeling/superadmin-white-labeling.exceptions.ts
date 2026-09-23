// RESPONSIBILITY: Defines business-specific exceptions for the white-labeling feature.
// FLOW: Service -> SuperadminWhiteLabelingBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminWhiteLabelingNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'WHITE_LABELING.RESOURCE.NOT_FOUND'; }
export class SuperadminWhiteLabelingBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'WHITE_LABELING.RESOURCE.CONFLICT'; }