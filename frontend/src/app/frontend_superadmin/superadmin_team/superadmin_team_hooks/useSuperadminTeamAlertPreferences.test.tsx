import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { updateTeamAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_api/SuperadminTeamApi';
import { useSuperadminTeamAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_hooks/useSuperadminTeamAlertPreferences';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_team/superadmin_team_api/SuperadminTeamApi', () => ({ updateTeamAlertPreferences: vi.fn() }));

describe('useSuperadminTeamAlertPreferences', () => {
  it('persists the caller-selected preferences through the Team API', async () => {
    vi.mocked(updateTeamAlertPreferences).mockResolvedValue({ success: true, message: 'Updated', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminTeamAlertPreferences(), { wrapper });
    await result.current.savePreferences([{ userId: 'user-1', email: true, inApp: true }] as never);
    expect(updateTeamAlertPreferences).toHaveBeenCalledWith([{ userId: 'user-1', email: true, inApp: true }], expect.any(String));
    expect(result.current.isSaving).toBe(false);
  });
});
