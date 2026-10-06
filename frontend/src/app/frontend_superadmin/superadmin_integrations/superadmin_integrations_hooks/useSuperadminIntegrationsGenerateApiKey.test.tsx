import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { generateSuperadminApiKey } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_api/SuperadminIntegrationsApiCrudApi';
import { useSuperadminIntegrationsGenerateApiKey } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsGenerateApiKey';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_api/SuperadminIntegrationsApiCrudApi', () => ({
  generateSuperadminApiKey: vi.fn(),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminIntegrationsGenerateApiKey', () => {
  it('calls the module API with the validated payload and intent idempotency key', async () => {
    vi.mocked(generateSuperadminApiKey).mockResolvedValue({ success: true, message: 'Generated', data: { id: 'key-1', secret: 'secret' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminIntegrationsGenerateApiKey(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ payload: { name: 'Test key', scopes: [] }, idempotencyKey: 'intent-1' } as never);
    });
    await waitFor(() => expect(generateSuperadminApiKey).toHaveBeenCalledWith({ name: 'Test key', scopes: [] }, 'intent-1'));
  });
});
