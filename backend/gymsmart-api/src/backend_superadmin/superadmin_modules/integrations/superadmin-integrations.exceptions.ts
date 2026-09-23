// RESPONSIBILITY: Defines business-specific exceptions for the integrations feature.
// FLOW: Service -> SuperadminIntegrationsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminIntegrationsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'INTEGRATIONS.RESOURCE.NOT_FOUND'; }
export class SuperadminIntegrationsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'INTEGRATIONS.RESOURCE.CONFLICT'; }