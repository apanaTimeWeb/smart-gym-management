// RESPONSIBILITY: Defines business-specific exceptions for the coupons feature.
// FLOW: Service -> CouponsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class CouponsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'COUPONS.RESOURCE.NOT_FOUND'; }
export class CouponsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'COUPONS.RESOURCE.CONFLICT'; }