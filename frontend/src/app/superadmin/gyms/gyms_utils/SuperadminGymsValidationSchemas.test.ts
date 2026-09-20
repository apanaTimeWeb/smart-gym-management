// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';
import { OnboardGymSchema } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';


describe('OnboardGymSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(OnboardGymSchema.safeParse({}).success).toBe(false);
  });
});
