import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreProductMutations';

describe('useManagerStoreProductMutations', () => {
  it('exports the dedicated product mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerStoreProductMutations).toBe('function');
  });
});
