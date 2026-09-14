import { z } from 'zod';
export const PlatformSettingSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  description: z.string(),
  category: z.string(),
  dataType: z.enum(['string', 'number', 'boolean']),
});
export type PlatformSetting = z.infer<typeof PlatformSettingSchema>;
