import { z } from 'zod';
// RESPONSIBILITY: Defines types and interfaces for the Superadmin Migrations (Schema Rollouts) module.

export type MigrationStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'ROLLED_BACK';

export interface MigrationLog {
  id: string;
  version: string;
  description: string;
  appliedAt: string | null;
  status: MigrationStatus;
  targetTenants: string; // e.g., 'ALL', 'V1.4_ONLY'
  durationMs: number | null;
  errorLog: string | null;
}


export const MigrationLogSchema = z.object({
  id: z.string(),
  version: z.string(),
  description: z.string(),
  status: z.enum(['SUCCESS', 'FAILED', 'ROLLBACK', 'PENDING']),
  executedAt: z.string(),
  durationMs: z.number(),
  executedBy: z.string(),
  errorDetails: z.string().optional()
});

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
