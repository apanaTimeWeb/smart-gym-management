// RESPONSIBILITY: Defines the normalized shape for typed application and infrastructure exceptions.
// FLOW: Feature/core exception -> CoreValidationExceptionFilter -> canonical HTTP error envelope.

import { HttpStatus } from '@nestjs/common';

export abstract class CoreAppException extends Error {
  protected constructor(
    readonly statusCode: number,
    readonly error: string,
    readonly errorCode: string,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class CoreEntityNotFoundException extends CoreAppException {
  constructor(entityName: string) {
    super(HttpStatus.NOT_FOUND, 'NOT_FOUND', 'CORE.ENTITY.NOT_FOUND', `${entityName} was not found.`);
  }
}

export class CoreRedisCounterTypeException extends CoreAppException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_ERROR', 'CORE.REDIS.INVALID_COUNTER', 'Redis returned an invalid counter value.');
  }
}

export class CoreRedisTimeoutException extends CoreAppException {
  constructor(operation: string) {
    super(HttpStatus.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE', 'CORE.REDIS.TIMEOUT', `${operation} timed out.`);
  }
}
