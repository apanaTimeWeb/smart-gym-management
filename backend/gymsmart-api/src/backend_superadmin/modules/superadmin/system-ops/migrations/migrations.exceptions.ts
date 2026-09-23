// RESPONSIBILITY: Defines business-specific exceptions for the migrations feature.
// FLOW: Service -> MigrationsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class MigrationsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'MIGRATIONS.RESOURCE.NOT_FOUND'; }
export class MigrationsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'MIGRATIONS.RESOURCE.CONFLICT'; }