import { describe, expect, it } from 'vitest';
import { formatSuperadminInfrastructureUptimeAxisTime } from '@/app/superadmin/system-ops/infrastructure/infrastructure_utils/SuperadminInfrastructureUptimeUtils';

describe('formatSuperadminInfrastructureUptimeAxisTime', () => {
  it('formats chart time labels', () => { expect(formatSuperadminInfrastructureUptimeAxisTime('2026-09-20T10:15:00.000Z')).toMatch(/\d{2}:\d{2}/); });
});
