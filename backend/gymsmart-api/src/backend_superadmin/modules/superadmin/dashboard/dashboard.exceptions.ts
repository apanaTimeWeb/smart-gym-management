// RESPONSIBILITY: Defines business-specific exceptions for the dashboard feature.
// FLOW: Service -> DashboardBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class DashboardNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'DASHBOARD.RESOURCE.NOT_FOUND'; }
export class DashboardBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'DASHBOARD.RESOURCE.CONFLICT'; }
