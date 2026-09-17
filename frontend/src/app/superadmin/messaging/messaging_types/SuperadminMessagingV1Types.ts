// RESPONSIBILITY: Defines the runtime-validated data contract for Message Templates & Campaign Results.
import { z } from 'zod';
export const SuperadminMessagingV1DataSchema = z.object({ templates: z.array(z.object({ name: z.string(), channel: z.string(), uses: z.number(), status: z.string() })), campaigns: z.array(z.object({ name: z.string(), sent: z.number(), delivered: z.number(), opened: z.number(), responded: z.number() })), channels: z.array(z.string()) });
export const SuperadminMessagingV1ResponseSchema = z.object({ data: SuperadminMessagingV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminMessagingV1Data = z.infer<typeof SuperadminMessagingV1DataSchema>;
export type SuperadminMessagingV1Response = z.infer<typeof SuperadminMessagingV1ResponseSchema>;
export interface SuperadminMessagingV1SectionProps {
    data: SuperadminMessagingV1Data;
}
