import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminFeaturesActions } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesActions';



const confirm = vi.fn().mockResolvedValue(true);
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminFeaturesActions', () => {
  it('sends the selected flag id, next state, and stable idempotency key to the supplied mutation boundary', async () => {
    const updateFeatureFlagStatus = vi.fn().mockResolvedValue({ success: true, message: 'Updated', data: { id: 'flag-1' } });
    const config = { publishNote: vi.fn(), resetReleaseNoteForm: vi.fn(), updateFeatureFlagStatus, updateFlag: vi.fn(), rolloutFlag: null };
    const { result } = renderHook(() => useSuperadminFeaturesActions(config as never, (key) => key));
    await result.current.handleToggle({ id: 'flag-1', name: 'Live chat', isGlobalEnabled: false } as never);
    expect(updateFeatureFlagStatus).toHaveBeenCalledWith(expect.objectContaining({ id: 'flag-1', enabled: true, idempotencyKey: expect.any(String) }));
  });
});
