// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';
import { platformSettingSchema } from '@/app/superadmin/settings/settings_utils/SuperadminSettingsSchemas';


describe('platformSettingSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(platformSettingSchema.safeParse({}).success).toBe(false);
  });
});
