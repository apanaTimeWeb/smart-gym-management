// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';
import { passwordSchema } from '@/app/superadmin/profile/profile_utils/SuperadminProfileSecurityFormSchema';


describe('passwordSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(passwordSchema.safeParse({}).success).toBe(false);
  });
});
