// RESPONSIBILITY: Defines the runtime-validated data contract for Audience Segmentation.
import { z } from 'zod';
export const SuperadminBroadcastsV1DataSchema = z.object({ segments: z.array(z.object({ name: z.string(), count: z.number(), description: z.string() })), channels: z.array(z.object({ name: z.string(), sent: z.number(), delivered: z.number(), opened: z.number(), clicked: z.number() })), templates: z.array(z.string()) });
export const SuperadminBroadcastsV1ResponseSchema = z.object({ data: SuperadminBroadcastsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminBroadcastsV1Data = z.infer<typeof SuperadminBroadcastsV1DataSchema>;
export type SuperadminBroadcastsV1Response = z.infer<typeof SuperadminBroadcastsV1ResponseSchema>;
export interface SuperadminBroadcastsV1SectionProps {
    data: SuperadminBroadcastsV1Data;
}
