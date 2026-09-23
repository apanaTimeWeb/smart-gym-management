// RESPONSIBILITY: Defines business-specific exceptions for the coupons feature.
// FLOW: Service -> SuperadminCouponsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminCouponsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'COUPONS.RESOURCE.NOT_FOUND'; }
export class SuperadminCouponsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'COUPONS.RESOURCE.CONFLICT'; }