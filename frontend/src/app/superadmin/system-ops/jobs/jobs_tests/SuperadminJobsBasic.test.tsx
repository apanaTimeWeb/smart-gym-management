import { resetSuperadminJobsMockState } from '@/app/superadmin/system-ops/jobs/jobs_mocks/handlers/SuperadminJobsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/superadmin/system-ops/jobs/jobs_mocks/fixtures/SuperadminJobsV1MockFixtures';

beforeEach(() => {
  resetSuperadminJobsMockState();
});

describe('Superadmin Jobs module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE).toBeDefined();
    const serialized = JSON.stringify(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
