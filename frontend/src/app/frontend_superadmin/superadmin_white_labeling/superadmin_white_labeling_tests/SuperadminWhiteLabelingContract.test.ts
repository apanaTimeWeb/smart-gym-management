import { describe, expect, it } from 'vitest';

import { mockWhiteLabelDomains } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_mocks/superadmin_white_labeling_mocks_fixtures/SuperadminWhiteLabelingMockFixtures';
import { WhiteLabelDomainsDataSchema } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_schemas/SuperadminWhiteLabelingSchemas';



describe('Superadmin White-labeling contract', () => {
  it('accepts the module-owned domain fixture', () => {
    expect(WhiteLabelDomainsDataSchema.safeParse(mockWhiteLabelDomains).success).toBe(true);
  });
});
