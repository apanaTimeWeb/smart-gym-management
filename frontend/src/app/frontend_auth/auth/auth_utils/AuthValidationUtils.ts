/**
 * RESPONSIBILITY: Converts Zod validation issues into the canonical Auth validation-error contract.
 * DATA FLOW: Zod request schema -> AuthValidationUtils -> ApiResponse.validationErrors -> Auth client.
 */
import type { ValidationErrorItem } from '@/lib/api';
import type { ZodIssue } from 'zod';

export const AuthValidationUtils = {
  /**
   * Maps Zod field paths to backend-compatible validation error items.
   * @param issues Zod issues produced by a request-boundary schema.
   * @returns Stable field/message pairs without leaking internal issue metadata.
   */
  toValidationErrors(issues: ZodIssue[]): ValidationErrorItem[] {
    return issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
  },
};
