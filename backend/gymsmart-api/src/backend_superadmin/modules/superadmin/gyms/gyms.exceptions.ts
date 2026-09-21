// RESPONSIBILITY: Defines business-specific exceptions for the gyms feature.
// FLOW: Service -> GymsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class GymsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'GYMS.RESOURCE.NOT_FOUND'; }
export class GymsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'GYMS.RESOURCE.CONFLICT'; }
