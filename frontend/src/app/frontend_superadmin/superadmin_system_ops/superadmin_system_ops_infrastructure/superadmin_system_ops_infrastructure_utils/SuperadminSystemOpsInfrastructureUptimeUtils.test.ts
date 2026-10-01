import { describe, expect, it } from 'vitest';

import { formatSuperadminInfrastructureUptimeAxisTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_utils/SuperadminSystemOpsInfrastructureUptimeUtils';

describe('formatSuperadminInfrastructureUptimeAxisTime', () => {
  it('formats chart time labels', () => { expect(formatSuperadminInfrastructureUptimeAxisTime('2026-09-20T10:15:00.000Z', 'en-IN')).toMatch(/\d{2}:\d{2}/); });
});
