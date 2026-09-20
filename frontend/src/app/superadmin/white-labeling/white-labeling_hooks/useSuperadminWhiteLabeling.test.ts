import { describe, expect, it } from 'vitest';
import { useSuperadminWhiteLabelingDomains } from '@/app/superadmin/white-labeling/white-labeling_hooks/useSuperadminWhiteLabeling.ts';

describe('useSuperadminWhiteLabelingDomains', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminWhiteLabelingDomains).toBe('function');
  });
});
