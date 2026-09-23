// RESPONSIBILITY: Defines business-specific exceptions for the jobs feature.
// FLOW: Service -> SuperadminJobsBusinessException -> global SuperadminDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
export class SuperadminJobsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'JOBS.RESOURCE.NOT_FOUND'; }
export class SuperadminJobsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'JOBS.RESOURCE.CONFLICT'; }