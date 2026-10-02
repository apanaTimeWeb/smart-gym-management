import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_fixtures/SuperadminFeaturesV1MockFixtures';
import { resetSuperadminFeaturesMockState } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_handlers/SuperadminFeaturesMockHandlers';
import { SuperadminFeaturesV1DataSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesV1Schema';



beforeEach(() => {
  resetSuperadminFeaturesMockState();
});

describe('Feature Rollouts & Release History contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminFeaturesV1DataSchema.safeParse(SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
