/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_settings_types.ts
import { z } from 'zod';export type PlatformSetting = z.infer<typeof PlatformSettingSchema>;
import { PlatformSettingSchema } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_schemas/SuperadminSettingsContractSchemas';
