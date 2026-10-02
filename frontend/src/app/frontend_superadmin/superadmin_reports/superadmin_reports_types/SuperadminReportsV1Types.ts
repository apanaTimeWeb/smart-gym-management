/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Runtime-validated contracts for Superadmin report comparison and its server-driven period/segment datasets.
import { z } from 'zod';

import { SuperadminReportsV1DataSchema, SuperadminReportsV1ResponseSchema, SuperadminReportsV1PeriodSchema, SuperadminReportsV1SegmentSchema, SuperadminReportsV1MetricSchema, SuperadminReportsV1ComparisonSetSchema } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsV1ContractSchemas';

export type SuperadminReportsV1Period = z.infer<typeof SuperadminReportsV1PeriodSchema>;
export type SuperadminReportsV1Segment = z.infer<typeof SuperadminReportsV1SegmentSchema>;
export type SuperadminReportsV1Metric = z.infer<typeof SuperadminReportsV1MetricSchema>;
export type SuperadminReportsV1Data = z.infer<typeof SuperadminReportsV1DataSchema>;
export type SuperadminReportsV1Response = z.infer<typeof SuperadminReportsV1ResponseSchema>;
export interface SuperadminReportsV1SectionProps { data: SuperadminReportsV1Data; }
