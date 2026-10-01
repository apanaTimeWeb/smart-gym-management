import { z } from 'zod';

export const SuperadminInfrastructureV1DataSchema = z.object({ summary: z.object({ requestsPerMinute: z.number(), errorsPercent: z.number(), p50: z.number(), p95: z.number(), p99: z.number() }), endpoints: z.array(z.object({ name: z.string(), p50: z.number(), p95: z.number(), p99: z.number(), errors: z.number() })), incidents: z.array(z.object({ title: z.string(), impact: z.string(), started: z.string(), status: z.string() })) });
