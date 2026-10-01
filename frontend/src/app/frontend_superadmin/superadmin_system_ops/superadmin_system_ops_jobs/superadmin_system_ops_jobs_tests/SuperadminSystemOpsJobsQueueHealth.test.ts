import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_fixtures/SuperadminSystemOpsJobsV1MockFixtures';
import { resetSuperadminJobsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_handlers/SuperadminSystemOpsJobsMockHandlers';
import { SuperadminJobsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsV1Schema';

beforeEach(() => {
  resetSuperadminJobsMockState();
});

describe('Background Job Queue Health contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminJobsV1DataSchema.safeParse(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
