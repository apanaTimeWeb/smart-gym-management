import { describe, expect, it } from 'vitest';
import { mockWhiteLabelDomains } from '@/app/superadmin/white-labeling/white-labeling_mocks/fixtures/SuperadminWhiteLabelingMockFixtures';
import { WhiteLabelDomainsDataSchema } from '@/app/superadmin/white-labeling/white-labeling_schemas/SuperadminWhiteLabelingSchemas';

describe('Superadmin White-labeling contract', () => {
  it('accepts the module-owned domain fixture', () => {
    expect(WhiteLabelDomainsDataSchema.safeParse(mockWhiteLabelDomains).success).toBe(true);
  });
});
