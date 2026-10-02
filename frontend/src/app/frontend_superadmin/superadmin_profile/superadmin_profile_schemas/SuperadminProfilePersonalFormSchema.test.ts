// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { personalSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfilePersonalFormSchema';



describe('personalSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(personalSchema.safeParse({}).success).toBe(false);
  });
});
