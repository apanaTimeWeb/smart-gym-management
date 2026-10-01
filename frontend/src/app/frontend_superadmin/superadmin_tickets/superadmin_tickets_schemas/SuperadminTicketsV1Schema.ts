import { z } from 'zod';

export const SuperadminTicketsV1DataSchema = z.object({ summary: z.object({ open: z.number(), urgent: z.number(), nearTarget: z.number(), overTarget: z.number(), averageFirstResponseMinutes: z.number(), averageResolutionHours: z.number(), satisfaction: z.number() }), agents: z.array(z.object({ name: z.string(), open: z.number(), urgent: z.number(), overTarget: z.number(), averageHours: z.number() })), aging: z.array(z.object({ bucket: z.string(), count: z.number() })), categories: z.array(z.object({ name: z.string(), count: z.number() })) });
