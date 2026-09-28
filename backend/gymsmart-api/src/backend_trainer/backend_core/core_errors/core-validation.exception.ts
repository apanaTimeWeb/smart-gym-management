// RESPONSIBILITY: Carries class-validator failures to the global canonical response filter without losing field paths.
// FLOW: ValidationPipe → CoreValidationException → CoreGlobalExceptionFilter → validationErrors.

import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';


/**
 * Intent: Defines the CoreValidationException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreValidationException extends BadRequestException {
  constructor(public readonly validationErrors: ValidationError[]) {
    super(validationErrors);
  }
}
