// RESPONSIBILITY: Defines business-specific exceptions for the integrations feature.
// FLOW: Service -> IntegrationsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class IntegrationsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'INTEGRATIONS.RESOURCE.NOT_FOUND'; }
export class IntegrationsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'INTEGRATIONS.RESOURCE.CONFLICT'; }
