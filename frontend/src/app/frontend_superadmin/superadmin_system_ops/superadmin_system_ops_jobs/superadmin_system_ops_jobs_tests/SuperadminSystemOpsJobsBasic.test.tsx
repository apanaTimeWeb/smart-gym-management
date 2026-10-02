// RESPONSIBILITY: Renders the SuperadminSystemOpsJobsBasic.test UI for the system ops feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_fixtures/SuperadminSystemOpsJobsV1MockFixtures';
import { resetSuperadminJobsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_handlers/SuperadminSystemOpsJobsMockHandlers';



beforeEach(() => resetSuperadminJobsMockState());

describe('Superadmin Jobs fixture behavior', () => {
  it('contains summary counters, queue variation, and recent failure records', () => {
    expect(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE.summary).toMatchObject({ waiting: 18, running: 6, failed24h: 4 });
    expect(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE.queues).toHaveLength(3);
    expect(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE.recentFailures).toHaveLength(3);
    expect(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE.recentFailures[0]).toMatchObject({ job: 'Report export' });
  });
});
