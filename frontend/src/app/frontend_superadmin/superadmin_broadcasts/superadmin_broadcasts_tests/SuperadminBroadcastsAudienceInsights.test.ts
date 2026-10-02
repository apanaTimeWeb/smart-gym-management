import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_fixtures/SuperadminBroadcastsV1MockFixtures';
import { resetSuperadminBroadcastsMockState } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_handlers/SuperadminBroadcastsMockHandlers';
import { SuperadminBroadcastsV1DataSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsV1ContractSchemas';


beforeEach(() => {
  resetSuperadminBroadcastsMockState();
});

describe('Audience Segmentation contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBroadcastsV1DataSchema.safeParse(SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
