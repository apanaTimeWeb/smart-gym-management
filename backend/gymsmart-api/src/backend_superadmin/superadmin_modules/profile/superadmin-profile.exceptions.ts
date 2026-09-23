// RESPONSIBILITY: Defines business-specific exceptions for the profile feature.
// FLOW: Service -> SuperadminProfileBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminProfileNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'PROFILE.RESOURCE.NOT_FOUND'; }
export class SuperadminProfileBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'PROFILE.RESOURCE.CONFLICT'; }