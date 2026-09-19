import { describe, expect, it } from 'vitest';
import { createAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminCreateIdempotencyKey';

describe('createAdminIdempotencyKey', () => {
  it('creates a UUID-shaped key for one confirmed intent', () => {
    expect(createAdminIdempotencyKey()).toMatch(/^[0-9a-f-]{36}$/i);
  });
});
