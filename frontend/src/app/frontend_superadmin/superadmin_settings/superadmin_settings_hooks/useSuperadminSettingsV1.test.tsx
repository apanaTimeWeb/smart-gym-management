import { fetchSettingsGovernance } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsGovernanceApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSettingsV1 } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsGovernanceApi', () => ({ fetchSettingsGovernance: vi.fn() }));
describe('useSuperadminSettingsV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchSettingsGovernance).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSettingsV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
