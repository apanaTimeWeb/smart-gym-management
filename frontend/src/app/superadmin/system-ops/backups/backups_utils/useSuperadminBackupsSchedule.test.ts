import { describe, expect, it } from 'vitest';
import { useSuperadminBackupsSchedule } from '@/app/superadmin/system-ops/backups/backups_utils/useSuperadminBackupsSchedule.ts';

describe('useSuperadminBackupsSchedule', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBackupsSchedule).toBe('function');
  });
});
