import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureUnsavedChangesGuard';





const push = vi.fn();
const confirm = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureConfirm', () => ({
  useTrainerInfrastructureConfirm: () => ({ confirm }),
}));

describe('useTrainerInfrastructureUnsavedChangesGuard', () => {
  it('navigates immediately when the form is clean', async () => {
    const navigate = vi.fn();
    const { result } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(false));
    await expect(result.current(navigate)).resolves.toBe(true);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('requires confirmation before navigating a dirty form', async () => {
    confirm.mockResolvedValueOnce(true);
    const navigate = vi.fn();
    const { result } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current(navigate)).resolves.toBe(true);
    });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'warning' }));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('does not navigate when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const navigate = vi.fn();
    const { result } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(true));
    await expect(result.current(navigate)).resolves.toBe(false);
    expect(navigate).not.toHaveBeenCalled();
  });
});
