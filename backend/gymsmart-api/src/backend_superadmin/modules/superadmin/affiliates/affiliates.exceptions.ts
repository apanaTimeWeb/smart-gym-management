// RESPONSIBILITY: Defines business-specific exceptions for the affiliates feature.
// FLOW: Service -> AffiliatesBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class AffiliatesNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'AFFILIATES.RESOURCE.NOT_FOUND'; }
export class AffiliatesBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'AFFILIATES.RESOURCE.CONFLICT'; }