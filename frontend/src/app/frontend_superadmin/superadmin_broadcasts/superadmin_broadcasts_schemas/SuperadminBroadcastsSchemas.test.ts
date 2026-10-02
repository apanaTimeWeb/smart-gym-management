// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { broadcastSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsSchemas';



describe('broadcastSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(broadcastSchema.safeParse({}).success).toBe(false);
  });
});
