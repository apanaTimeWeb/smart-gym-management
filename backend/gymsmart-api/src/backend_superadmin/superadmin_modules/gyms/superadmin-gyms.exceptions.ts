// RESPONSIBILITY: Defines business-specific exceptions for the gyms feature.
// FLOW: Service -> SuperadminGymsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminGymsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'GYMS.RESOURCE.NOT_FOUND'; }
export class SuperadminGymsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'GYMS.RESOURCE.CONFLICT'; }