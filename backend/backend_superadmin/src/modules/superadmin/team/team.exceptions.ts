// RESPONSIBILITY: Defines business-specific exceptions for the team feature.
// FLOW: Service -> TeamBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class TeamNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'TEAM.RESOURCE.NOT_FOUND'; }
export class TeamBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'TEAM.RESOURCE.CONFLICT'; }
