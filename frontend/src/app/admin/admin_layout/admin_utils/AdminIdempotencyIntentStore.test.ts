import { describe, expect, it } from 'vitest';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';

describe('AdminIdempotencyIntentStore', () => {
  it('reuses the exact same key for a retry of the same confirmed intent', () => {
    const registry = new Map<string, string>();
    const firstKey = getAdminIdempotencyKey(registry, 'payroll:pay-1');
    const retryKey = getAdminIdempotencyKey(registry, 'payroll:pay-1');

    expect(retryKey).toBe(firstKey);
  });

  it('creates a fresh key after an intent is explicitly abandoned', () => {
    const registry = new Map<string, string>();
    const firstKey = getAdminIdempotencyKey(registry, 'delete:member-1');
    clearAdminIdempotencyKey(registry, 'delete:member-1');
    const reopenedKey = getAdminIdempotencyKey(registry, 'delete:member-1');

    expect(reopenedKey).not.toBe(firstKey);
  });
});
