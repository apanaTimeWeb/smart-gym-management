// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';
import { personalSchema } from '@/app/superadmin/profile/profile_utils/SuperadminProfilePersonalFormSchema';


describe('personalSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(personalSchema.safeParse({}).success).toBe(false);
  });
});
