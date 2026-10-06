import { z } from 'zod';

export const roleTypeSchema = z.enum(['manager', 'trainer', 'receptionist']);

export const rolePermissionsSchema = z.object({
  role: roleTypeSchema,
  permissions: z.record(z.string(), z.boolean()),
});

export const staffOverrideSchema = z.object({
  staffId: z.string(),
  staffName: z.string(),
  role: roleTypeSchema,
  overrides: z.record(z.string(), z.boolean()),
});

export const permissionsListSchema = z.array(rolePermissionsSchema);
export const staffOverridesSchema = z.array(staffOverrideSchema);
