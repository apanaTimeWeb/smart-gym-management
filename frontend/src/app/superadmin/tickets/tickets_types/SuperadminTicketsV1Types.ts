// RESPONSIBILITY: Defines the runtime-validated data contract for Support Performance & Service Levels.
import { z } from 'zod';
export const SuperadminTicketsV1DataSchema = z.object({ summary: z.object({ open: z.number(), urgent: z.number(), nearTarget: z.number(), overTarget: z.number(), averageFirstResponseMinutes: z.number(), averageResolutionHours: z.number(), satisfaction: z.number() }), agents: z.array(z.object({ name: z.string(), open: z.number(), urgent: z.number(), overTarget: z.number(), averageHours: z.number() })), aging: z.array(z.object({ bucket: z.string(), count: z.number() })), categories: z.array(z.object({ name: z.string(), count: z.number() })) });
export const SuperadminTicketsV1ResponseSchema = z.object({ data: SuperadminTicketsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminTicketsV1Data = z.infer<typeof SuperadminTicketsV1DataSchema>;
export type SuperadminTicketsV1Response = z.infer<typeof SuperadminTicketsV1ResponseSchema>;
export interface SuperadminTicketsV1SectionProps {
    data: SuperadminTicketsV1Data;
}
