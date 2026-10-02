/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminReportsV1DataSchema = z.object({
  periods: z.array(SuperadminReportsV1PeriodSchema),
  segments: z.array(SuperadminReportsV1SegmentSchema),
  currency: z.string().optional(), metrics: z.array(SuperadminReportsV1MetricSchema),
  planComparison: z.array(z.object({ name: z.string(), income: z.number(), gyms: z.number() })),
  regionComparison: z.array(z.object({ name: z.string(), current: z.number(), previous: z.number() })),
  comparisonSets: z.array(SuperadminReportsV1ComparisonSetSchema),
});
export const SuperadminReportsV1ResponseSchema = z.object({ data: SuperadminReportsV1DataSchema, message: z.string(), success: z.boolean() });
const SuperadminReportsV1PeriodSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminReportsV1SegmentSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminReportsV1MetricSchema = z.object({ name: z.string(), current: z.number(), previous: z.number(), change: z.number() });
const SuperadminReportsV1ComparisonSetSchema = z.object({ periodKey: z.string(), segmentKey: z.string(), currency: z.string().optional(), metrics: z.array(SuperadminReportsV1MetricSchema) });
