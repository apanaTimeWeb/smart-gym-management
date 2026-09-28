// RESPONSIBILITY: Owns global Manager request sanitization and strict DTO validation.
// FLOW: Raw request -> recursive sanitization -> whitelist/forbid DTO validation -> transformed DTO.
import { ArgumentMetadata, BadRequestException, Injectable, ValidationError, ValidationPipe } from '@nestjs/common';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerCoreInputSanitizationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException({
        __validation: true,
        validationErrors: ManagerCoreInputSanitizationPipe.toValidationItems(errors),
      }),
    });
  }

  /** @description Sanitizes string content before the parent ValidationPipe validates and transforms the DTO. @param value - Incoming argument value. @param metadata - Nest argument metadata. @returns Validated/transformed DTO or sanitized primitive when no DTO is defined. */
  override transform(value: unknown, metadata: ArgumentMetadata): Promise<any> {
    return Promise.resolve(this.transformSync(value, metadata));
  }

  transformSync(value: unknown, metadata: ArgumentMetadata): unknown {
    return super.transform(this.sanitize(value), metadata);
  }

  /** @description Converts nested class-validator errors to the canonical dot-path contract. @param errors - Validation error tree. @returns Field-level validation items. */
  private static toValidationItems(errors: ValidationError[], parentPath = ''): ManagerCoreJsonObject[] {
    return errors.flatMap((error) => {
      const field = parentPath ? `${parentPath}.${error.property}` : error.property;
      const current = Object.entries(error.constraints ?? {}).map(([, message]) => ({ field, message }));
      const children = ManagerCoreInputSanitizationPipe.toValidationItems(error.children ?? [], field);
      return [...current, ...children];
    }) as ManagerCoreJsonObject[];
  }

  /** @description Recursively trims strings and removes HTML/script tags before validation. @param value - Incoming value. @returns Sanitized structure. */
  private sanitize(value: unknown): unknown {
    if (typeof value === 'string') return value.trim().replace(/<\/?[^>]+>/g, '');
    if (Array.isArray(value)) return value.map((item) => this.sanitize(item));
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => {
        const sanitized = this.sanitize(item);
        if (typeof sanitized !== 'string') return [key, sanitized];
        if (key.toLowerCase().includes('email')) return [key, sanitized.toLowerCase()];
        if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')) return [key, sanitized.replace(/[^0-9+]/g, '')];
        return [key, sanitized];
      }));
    }
    return value;
  }
}
