import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminFeaturesMainViewModel } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesMainViewModel';



vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(false) }) }));
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard', () => ({ useSuperadminLayoutUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData', () => ({
  useSuperadminFeaturesData: () => ({ data: { flags: [] }, isPending: false, isError: false, publishNote: vi.fn(), updateFeatureFlagStatus: vi.fn(), updateFlag: vi.fn() }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFilteredFlags', () => ({ useSuperadminFeaturesFilteredFlags: (flags: unknown[]) => flags }));

describe('useSuperadminFeaturesMainViewModel', () => {
  it('starts on the flags tab with an empty search and a feature-owned empty result set', () => {
    const { result } = renderHook(() => useSuperadminFeaturesMainViewModel());
    expect(result.current.activeTab).toBe('FLAGS');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredFlags).toEqual([]);
  });
});
