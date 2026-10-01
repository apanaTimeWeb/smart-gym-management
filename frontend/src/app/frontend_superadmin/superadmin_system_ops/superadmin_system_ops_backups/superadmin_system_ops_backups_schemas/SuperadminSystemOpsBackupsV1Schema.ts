import { z } from 'zod';

export const SuperadminBackupsV1DataSchema = z.object({ summary: z.object({ healthy: z.number(), warning: z.number(), failed: z.number(), lastRestoreTest: z.string(), restoreTestStatus: z.string(), recoveryPointTarget: z.string(), recoveryTimeTarget: z.string() }), tenants: z.array(z.object({ gym: z.string(), lastBackup: z.string(), size: z.string(), ageHours: z.number(), status: z.string() })), restoreHistory: z.array(z.object({ date: z.string(), scope: z.string(), durationMinutes: z.number(), status: z.string() })) });
