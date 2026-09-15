// RESPONSIBILITY: Encapsulates functionality for SuperadminSettingsSchemas.ts
import { z } from 'zod';
export const platformSettingSchema = z.object({ value: z.string().min(1, 'Value cannot be empty.') });
export type PlatformSettingFormValues = z.infer<typeof platformSettingSchema>;
