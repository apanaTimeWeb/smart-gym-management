// RESPONSIBILITY: Runtime-validated contracts for Superadmin report comparison and its server-driven period/segment datasets.
import { z } from 'zod';

const SuperadminReportsV1PeriodSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminReportsV1SegmentSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminReportsV1MetricSchema = z.object({ name: z.string(), current: z.number(), previous: z.number(), change: z.number() });
const SuperadminReportsV1ComparisonSetSchema = z.object({ periodKey: z.string(), segmentKey: z.string(), metrics: z.array(SuperadminReportsV1MetricSchema) });

export const SuperadminReportsV1DataSchema = z.object({
  periods: z.array(SuperadminReportsV1PeriodSchema),
  segments: z.array(SuperadminReportsV1SegmentSchema),
  metrics: z.array(SuperadminReportsV1MetricSchema),
  planComparison: z.array(z.object({ name: z.string(), income: z.number(), gyms: z.number() })),
  regionComparison: z.array(z.object({ name: z.string(), current: z.number(), previous: z.number() })),
  comparisonSets: z.array(SuperadminReportsV1ComparisonSetSchema),
});
export const SuperadminReportsV1ResponseSchema = z.object({ data: SuperadminReportsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminReportsV1Period = z.infer<typeof SuperadminReportsV1PeriodSchema>;
export type SuperadminReportsV1Segment = z.infer<typeof SuperadminReportsV1SegmentSchema>;
export type SuperadminReportsV1Metric = z.infer<typeof SuperadminReportsV1MetricSchema>;
export type SuperadminReportsV1Data = z.infer<typeof SuperadminReportsV1DataSchema>;
export type SuperadminReportsV1Response = z.infer<typeof SuperadminReportsV1ResponseSchema>;
export interface SuperadminReportsV1SectionProps { data: SuperadminReportsV1Data; }
