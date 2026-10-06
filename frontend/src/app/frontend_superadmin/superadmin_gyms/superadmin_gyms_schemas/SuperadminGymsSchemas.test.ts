// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { addGymSchema, emailOwnerSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsSchemas';



describe('addGymSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(addGymSchema.safeParse({}).success).toBe(false);
  });
});

describe('emailOwnerSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(emailOwnerSchema.safeParse({}).success).toBe(false);
  });
});
