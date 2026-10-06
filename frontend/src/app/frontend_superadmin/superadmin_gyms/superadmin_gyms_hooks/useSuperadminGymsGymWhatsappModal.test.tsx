import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGymsGymWhatsappModal } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymWhatsappModal';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';



vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard', () => ({ useSuperadminLayoutUnsavedChangesGuard: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi', () => ({ gymsApi: { emailGymOwner: vi.fn() } }));

describe('useSuperadminGymsGymWhatsappModal', () => {
  it('binds the currently selected gym into the outgoing form state and starts clean', () => {
    useSuperadminGymsStore.getState().openWhatsappModal?.({ id: 'gym-1', name: 'Gym Alpha', phone: '9876543210', ownerName: 'Owner' } as never);
    const { result } = renderHook(() => useSuperadminGymsGymWhatsappModal());
    expect(result.current.selectedGym?.id).toBe('gym-1');
    expect(result.current.isDirty).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });
});
