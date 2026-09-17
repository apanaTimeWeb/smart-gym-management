import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import toast from 'react-hot-toast';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe('Trainer feedback behavior', () => {
  it('uses backend messages and stable success IDs', () => {
    const { result } = renderHook(() => useTrainerFeedback());
    act(() => result.current.showSuccess('Session scheduled', 'trainer-sessions-schedule-success'));
    expect(vi.mocked(toast.success)).toHaveBeenCalledWith('Session scheduled', { id: 'trainer-sessions-schedule-success' });
  });

  it('uses stable error IDs for failed actions', () => {
    const { result } = renderHook(() => useTrainerFeedback());
    act(() => result.current.showError(new Error('Session failed'), 'trainer-sessions-schedule-error'));
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith('Session failed', { id: 'trainer-sessions-schedule-error' });
  });
});
