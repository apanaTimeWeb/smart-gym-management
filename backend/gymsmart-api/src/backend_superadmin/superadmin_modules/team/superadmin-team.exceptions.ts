// RESPONSIBILITY: Defines business-specific exceptions for the team feature.
// FLOW: Service -> SuperadminTeamBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminTeamNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'TEAM.RESOURCE.NOT_FOUND'; }
export class SuperadminTeamBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'TEAM.RESOURCE.CONFLICT'; }