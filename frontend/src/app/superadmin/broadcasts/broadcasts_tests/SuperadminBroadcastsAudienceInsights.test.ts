import { resetSuperadminBroadcastsMockState } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminBroadcastsV1DataSchema } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsV1Types';
import { SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsV1MockFixtures';
beforeEach(() => {
  resetSuperadminBroadcastsMockState();
});

describe('Audience Segmentation contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBroadcastsV1DataSchema.safeParse(SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
