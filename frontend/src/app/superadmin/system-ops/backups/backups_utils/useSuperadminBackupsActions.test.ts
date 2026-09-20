import { describe, expect, it } from 'vitest';
import { useSuperadminBackupsActions } from '@/app/superadmin/system-ops/backups/backups_utils/useSuperadminBackupsActions.ts';

describe('useSuperadminBackupsActions', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBackupsActions).toBe('function');
  });
});
