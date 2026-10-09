import { renderHook, act } from '@testing-library/react';

import { toast } from 'sonner';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureFeedback';






vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('Trainer feedback behavior', () => {
  it('uses backend messages and stable success IDs', () => {
    const { result } = renderHook(() => useTrainerInfrastructureFeedback());
    act(() => result.current.showSuccess('Session scheduled', 'trainer_sessions-schedule-success'));
    expect(vi.mocked(toast.success)).toHaveBeenCalledWith('Session scheduled', { id: 'trainer_sessions-schedule-success' });
  });

  it('uses stable error IDs for failed actions', () => {
    const { result } = renderHook(() => useTrainerInfrastructureFeedback());
    act(() => result.current.showError(new Error('Session failed'), 'trainer_sessions-schedule-error'));
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith('Session failed', { id: 'trainer_sessions-schedule-error' });
  });
});
