// RESPONSIBILITY: Defines business-specific exceptions for the profile feature.
// FLOW: Service -> ProfileBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class ProfileNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'PROFILE.RESOURCE.NOT_FOUND'; }
export class ProfileBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'PROFILE.RESOURCE.CONFLICT'; }
