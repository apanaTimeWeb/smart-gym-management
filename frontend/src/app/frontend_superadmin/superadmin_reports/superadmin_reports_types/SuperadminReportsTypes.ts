/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_reports_types.ts
import { z } from 'zod';export type RevenueRow = z.infer<typeof RevenueRowSchema>;export type CancellationsRecord = z.infer<typeof CancellationsRecordSchema>;export type TenantHealthScore = z.infer<typeof TenantHealthScoreSchema>;
import { RevenueRowSchema, CancellationsRecordSchema, TenantHealthScoreSchema } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsContractSchemas';
export type SuperadminReportsDateField = 'startDate' | 'endDate';
