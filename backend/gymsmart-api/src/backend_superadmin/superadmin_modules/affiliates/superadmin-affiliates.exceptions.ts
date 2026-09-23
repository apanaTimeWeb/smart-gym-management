// RESPONSIBILITY: Defines business-specific exceptions for the affiliates feature.
// FLOW: Service -> SuperadminAffiliatesBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminAffiliatesNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'AFFILIATES.RESOURCE.NOT_FOUND'; }
export class SuperadminAffiliatesBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'AFFILIATES.RESOURCE.CONFLICT'; }