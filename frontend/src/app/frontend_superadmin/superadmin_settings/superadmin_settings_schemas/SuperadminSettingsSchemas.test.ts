// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { platformSettingSchema } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_schemas/SuperadminSettingsSchemas';



describe('platformSettingSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(platformSettingSchema.safeParse({}).success).toBe(false);
  });
});
