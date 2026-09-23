// RESPONSIBILITY: Defines business-specific exceptions for the migrations feature.
// FLOW: Service -> SuperadminMigrationsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminMigrationsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'MIGRATIONS.RESOURCE.NOT_FOUND'; }
export class SuperadminMigrationsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'MIGRATIONS.RESOURCE.CONFLICT'; }