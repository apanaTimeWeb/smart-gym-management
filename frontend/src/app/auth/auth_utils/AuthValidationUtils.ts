/**
 * RESPONSIBILITY: Converts Zod validation issues into the canonical API validation-error contract used by Auth routes.
 * DATA FLOW: Invalid request payload -> Zod issues -> ValidationErrorItem[] -> canonical error response.
 */
import type { ValidationErrorItem } from '@/lib/api';
import type { ZodIssue } from 'zod';

export const AuthValidationUtils = {
  toValidationErrors(issues: ZodIssue[]): ValidationErrorItem[] {
    return issues.map((issue) => ({
      field: issue.path.length > 0 ? issue.path.join('.') : 'request',
      message: issue.message,
    }));
  },
};
