import { describe, expect, it, vi } from 'vitest';
import { fetchProgressEntries, createProgressEntry, deleteProgressEntry } from '@/app/trainer/progress-tracking/progress_api/TrainerProgressApi';
import { MOCK_PROGRESS_ENTRIES } from '@/app/trainer/progress-tracking/progress_fixtures/TrainerProgressMockData';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer progress API behavior', () => {
  it('fetches progress entries for the requested member', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: MOCK_PROGRESS_ENTRIES.slice(0, 2) });
    const result = await fetchProgressEntries('1');
    expect(apiFetch.mock.calls[0][0]).toContain('/1/entries');
    expect(result).toHaveLength(2);
  });
  it('runs create and delete through the module API paths', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Created', data: MOCK_PROGRESS_ENTRIES[0] });
    await createProgressEntry('1', { date: '2026-09-17', weightKg: 83.5, heightCm: 175 });
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Deleted', data: null });
    await deleteProgressEntry('1', 'prog_1');
    expect(apiFetch.mock.calls[1][1]).toMatchObject({ method: 'DELETE' });
  });
});
