import { z } from 'zod';

export const MigrationStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK', 'SUCCESS', 'ROLLBACK']);

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

export const SuperadminMigrationsTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
});

export const SchemaMigrationSchema = z.object({
    id: z.string(),
    name: z.string(),
    appliedAt: z.string().nullable(),
    status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
});

export const MigrationsPageDataSchema = z.object({
    migrations: z.array(SchemaMigrationSchema),
    tenants: z.array(SuperadminMigrationsTenantSchema),
});
