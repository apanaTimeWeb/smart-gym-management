// RESPONSIBILITY: Defines the runtime-validated data contract for Backup Safety & Restore Readiness.
import { z } from 'zod';
export const SuperadminBackupsV1DataSchema = z.object({ summary: z.object({ healthy: z.number(), warning: z.number(), failed: z.number(), lastRestoreTest: z.string(), restoreTestStatus: z.string(), recoveryPointTarget: z.string(), recoveryTimeTarget: z.string() }), tenants: z.array(z.object({ gym: z.string(), lastBackup: z.string(), size: z.string(), ageHours: z.number(), status: z.string() })), restoreHistory: z.array(z.object({ date: z.string(), scope: z.string(), durationMinutes: z.number(), status: z.string() })) });
export const SuperadminBackupsV1ResponseSchema = z.object({ data: SuperadminBackupsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminBackupsV1Data = z.infer<typeof SuperadminBackupsV1DataSchema>;
export type SuperadminBackupsV1Response = z.infer<typeof SuperadminBackupsV1ResponseSchema>;
export interface SuperadminBackupsV1SectionProps {
    data: SuperadminBackupsV1Data;
}
