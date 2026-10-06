import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminIntegrationsGenerateApiKeyForm } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsGenerateApiKeyForm';



const mutateAsync = vi.fn();
vi.mock('@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsGenerateApiKey', () => ({
  useSuperadminIntegrationsGenerateApiKey: () => ({ mutateAsync, isPending: false, error: null }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard', () => ({
  useSuperadminLayoutUnsavedChangesGuard: vi.fn(),
}));

describe('useSuperadminIntegrationsGenerateApiKeyForm', () => {
  it('initializes the required API-key fields and clears generated secret on reset', async () => {
    mutateAsync.mockResolvedValue({ success: true, message: 'Generated', data: { secretKey: 'secret-1' } });
    const { result } = renderHook(() => useSuperadminIntegrationsGenerateApiKeyForm());
    expect(result.current.form.getValues()).toEqual({ label: '', tenantId: '', scopes: ['READ'] });

    await act(async () => {
      await result.current.handleSubmit({ label: 'Read key', tenantId: 'tenant-1', scopes: ['READ'] } as never);
    });
    await waitFor(() => expect(result.current.generatedSecret).toBe('secret-1'));

    act(() => result.current.resetForm());
    expect(result.current.generatedSecret).toBeNull();
    expect(result.current.idempotencyKeyRef.current).toBeNull();
  });
});
