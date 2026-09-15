import { z } from 'zod';
// RESPONSIBILITY: Defines types and interfaces for the Superadmin Migrations (Schema Rollouts) module.

export const MigrationStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK', 'SUCCESS', 'ROLLBACK']);
export type MigrationStatus = z.infer<typeof MigrationStatusSchema>;

export const MigrationLogSchema = z.object({
  id: z.string(),
  version: z.string(),
  description: z.string(),
  appliedAt: z.string().nullable().optional(),
  status: MigrationStatusSchema,
  targetTenants: z.string().optional(),
  durationMs: z.number().nullable().optional(),
  errorLog: z.string().nullable().optional(),
  executedAt: z.string().optional(),
  executedBy: z.string().optional(),
  errorDetails: z.string().optional(),
});
export type MigrationLog = z.infer<typeof MigrationLogSchema>;

export const SuperadminMigrationsTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string(),
});
export type SuperadminMigrationsTenant = z.infer<typeof SuperadminMigrationsTenantSchema>;

export const SchemaMigrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  appliedAt: z.string().nullable(),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
});
export type SchemaMigration = z.infer<typeof SchemaMigrationSchema>;

export const MigrationsPageDataSchema = z.object({
  migrations: z.array(SchemaMigrationSchema),
  tenants: z.array(SuperadminMigrationsTenantSchema),
});
export type MigrationsPageData = z.infer<typeof MigrationsPageDataSchema>;
