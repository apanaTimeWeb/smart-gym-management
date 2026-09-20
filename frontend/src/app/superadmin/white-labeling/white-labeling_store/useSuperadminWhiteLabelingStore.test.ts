import { describe, expect, it } from 'vitest';
import { useSuperadminWhiteLabelingStore } from '@/app/superadmin/white-labeling/white-labeling_store/useSuperadminWhiteLabelingStore.ts';

describe('useSuperadminWhiteLabelingStore', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminWhiteLabelingStore).toBe('function');
  });
});
