// RESPONSIBILITY: Defines business-specific exceptions for the infrastructure feature.
// FLOW: Service -> SuperadminInfrastructureBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminInfrastructureNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'INFRASTRUCTURE.RESOURCE.NOT_FOUND'; }
export class SuperadminInfrastructureBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'INFRASTRUCTURE.RESOURCE.CONFLICT'; }