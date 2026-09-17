// RESPONSIBILITY: Defines the runtime-validated data contract for Platform Governance.
import { z } from 'zod';
export const SuperadminSettingsV1DataSchema = z.object({ billing: z.array(z.object({ label: z.string(), value: z.string() })), security: z.array(z.object({ label: z.string(), value: z.string() })), data: z.array(z.object({ label: z.string(), value: z.string() })), communication: z.array(z.object({ label: z.string(), value: z.string() })) });
export const SuperadminSettingsV1ResponseSchema = z.object({ data: SuperadminSettingsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminSettingsV1Data = z.infer<typeof SuperadminSettingsV1DataSchema>;
export type SuperadminSettingsV1Response = z.infer<typeof SuperadminSettingsV1ResponseSchema>;
export interface SuperadminSettingsV1SectionProps {
    data: SuperadminSettingsV1Data;
}
