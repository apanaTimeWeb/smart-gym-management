// RESPONSIBILITY: Carries class-validator failures to the global canonical response filter without losing field paths.
// FLOW: ValidationPipe → CoreValidationException → CoreGlobalExceptionFilter → validationErrors.

import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

export class CoreValidationException extends BadRequestException {
  constructor(public readonly validationErrors: ValidationError[]) {
    super(validationErrors);
  }
}
