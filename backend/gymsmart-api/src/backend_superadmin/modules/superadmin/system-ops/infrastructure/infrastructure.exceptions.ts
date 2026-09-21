// RESPONSIBILITY: Defines business-specific exceptions for the infrastructure feature.
// FLOW: Service -> InfrastructureBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class InfrastructureNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'INFRASTRUCTURE.RESOURCE.NOT_FOUND'; }
export class InfrastructureBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'INFRASTRUCTURE.RESOURCE.CONFLICT'; }
