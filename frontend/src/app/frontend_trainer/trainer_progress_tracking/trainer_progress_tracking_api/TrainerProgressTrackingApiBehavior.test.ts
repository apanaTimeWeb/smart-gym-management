import { describe, expect, it, vi } from 'vitest';

import { fetchTrainerProgressTrackingProgressEntries, createTrainerProgressTrackingProgressEntry, deleteTrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_api/TrainerProgressTrackingApi';

import { TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_fixtures/TrainerProgressTrackingMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer progress API behavior', () => {
  it('fetches progress entries for the requested member', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES.slice(0, 2) });
    const result = await fetchTrainerProgressTrackingProgressEntries('1');
    expect(apiFetch.mock.calls[0][0]).toContain('/1/entries');
    expect(result).toHaveLength(2);
  });
  it('runs create and delete through the module API paths', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Created', data: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES[0] });
    await createTrainerProgressTrackingProgressEntry('1', { date: '2026-09-17', weightKg: 83.5, heightCm: 175 }, 'progress-create-test-key');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Deleted', data: null });
    await deleteTrainerProgressTrackingProgressEntry('1', 'prog_1', 'progress-delete-test-key');
    expect(apiFetch.mock.calls[1][1]).toMatchObject({ method: 'DELETE' });
  });
});
