// RESPONSIBILITY: Defines business-specific exceptions for the jobs feature.
// FLOW: Service -> JobsBusinessException -> global DomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class JobsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'JOBS.RESOURCE.NOT_FOUND'; }
export class JobsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'JOBS.RESOURCE.CONFLICT'; }
