// RESPONSIBILITY: Defines business-specific exceptions for the dashboard feature.
// FLOW: Service -> SuperadminDashboardBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminDashboardNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'DASHBOARD.RESOURCE.NOT_FOUND'; }
export class SuperadminDashboardBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'DASHBOARD.RESOURCE.CONFLICT'; }