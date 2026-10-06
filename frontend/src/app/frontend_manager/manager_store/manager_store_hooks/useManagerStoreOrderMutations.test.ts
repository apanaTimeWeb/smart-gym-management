import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreOrderMutations';

describe('useManagerStoreOrderMutations', () => {
  it('exports the dedicated order mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerStoreOrderMutations).toBe('function');
  });
});
