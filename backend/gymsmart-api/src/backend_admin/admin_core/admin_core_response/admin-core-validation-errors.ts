// RESPONSIBILITY: Flattens NestJS class-validator errors into the canonical field-path error contract.
// FLOW: ValidationError tree -> dot/bracket field paths -> ValidationErrorItem[] -> global exception envelope.

import type { ValidationError } from 'class-validator';

export interface AdminCoreValidationErrorItem {
  field: string;
  message: string;
}

/**
 * @description Converts nested class-validator errors into deterministic field/message pairs.
 * @param errors Root validation errors produced by ValidationPipe.
 * @returns Flattened canonical validation error items.
 * @remarks Child paths use dot notation so frontend forms can map errors without guessing.
 */
export function flattenAdminCoreValidationErrors(errors: ValidationError[]): AdminCoreValidationErrorItem[] {
  const output: AdminCoreValidationErrorItem[] = [];
  const visit = (items: ValidationError[], parentPath = ''): void => {
    for (const item of items) {
      const field = parentPath ? `${parentPath}.${item.property}` : item.property;
      for (const message of Object.values(item.constraints ?? {})) output.push({ field, message });
      if (item.children?.length) visit(item.children, field);
    }
  };
  visit(errors);
  return output;
}
