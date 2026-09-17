// RESPONSIBILITY: Renders the use Superadmin Backups Data.test component and its associated UI logic.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSuperadminBackupsData } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsData';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import toast from 'react-hot-toast';
vi.mock('@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api');
vi.mock('react-hot-toast');
describe('useSuperadminBackupsData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('initially has a loading state', async () => {
        vi.mocked(backupsApi.fetchBackups).mockImplementation(() => new Promise(() => { })); // pending
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const { result } = renderHook(() => useSuperadminBackupsData(), { wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> });
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
    });
    it('fetches backups and sets state to success', async () => {
        const mockBackups = { data: [{ id: '1', tenantName: 'Gym A' }] };
        vi.mocked(backupsApi.fetchBackups).mockResolvedValue(mockBackups as never);
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const { result } = renderHook(() => useSuperadminBackupsData(), { wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        expect(result.current.data).toEqual(mockBackups.data);
    });
    it('handles errors gracefully', async () => {
        vi.mocked(backupsApi.fetchBackups).mockRejectedValue(new Error('Network error'));
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const { result } = renderHook(() => useSuperadminBackupsData(), { wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(true);
        });
        expect(result.current.error).toBeDefined();
    });
});
