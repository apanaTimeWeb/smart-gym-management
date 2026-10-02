import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminWhiteLabelingStore } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_store/useSuperadminWhiteLabelingStore';



describe('useSuperadminWhiteLabelingStore', () => {
  it('starts without a selected domain and can select/clear one', () => {
    const { result } = renderHook(() => useSuperadminWhiteLabelingStore());
    act(() => result.current.setSelectedDomainId('domain-1'));
    expect(result.current.selectedDomainId).toBe('domain-1');
    act(() => result.current.setSelectedDomainId(null));
    expect(result.current.selectedDomainId).toBeNull();
  });
});
