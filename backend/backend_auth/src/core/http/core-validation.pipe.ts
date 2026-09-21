// RESPONSIBILITY: Configures the global validation pipe with strict payload rejection while preserving raw ValidationError trees.
// FLOW: HTTP payload -> CoreValidationPipe -> class-validator ValidationError[] -> CoreValidationExceptionFilter.

import { BadRequestException, ValidationPipe } from '@nestjs/common';

import type { ValidationError } from 'class-validator';
export class CoreValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
    });
  }
}
