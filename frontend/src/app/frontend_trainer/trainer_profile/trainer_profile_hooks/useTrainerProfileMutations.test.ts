import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerProfileMutations } from '@/app/frontend_trainer/trainer_profile/trainer_profile_hooks/useTrainerProfileMutations';




const invalidateQueries = vi.fn().mockResolvedValue(undefined);
const setQueryData = vi.fn();
const api = {
  updateProfile: vi.fn().mockResolvedValue({ success: true, data: { id: 'trainer-1', name: 'Updated' } }),
  updatePassword: vi.fn().mockResolvedValue({ success: true }),
};

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries, setQueryData }),
  useMutation: (options: { mutationFn: (variables: never) => Promise<unknown>; onSuccess?: (data: unknown) => unknown }) => ({
    mutateAsync: vi.fn(async (variables: never) => {
      const data = await options.mutationFn(variables);
      await options.onSuccess?.(data);
      return data;
    }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_profile/trainer_profile_api/TrainerProfileApi', () => ({ TrainerProfileApi: api }));



describe('useTrainerProfileMutations', () => {
  it('writes the successful profile response into the canonical query and invalidates it', async () => {
    const { result } = renderHook(() => useTrainerProfileMutations());
    const values = { name: 'Updated' } as never;

    await act(async () => {
      await result.current.updateProfile({ values, idempotencyKey: 'profile-1' });
    });

    expect(api.updateProfile).toHaveBeenCalledWith(values, 'profile-1');
    expect(setQueryData).toHaveBeenCalledWith(['trainer_profile', 'profile'], { id: 'trainer-1', name: 'Updated' });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_profile', 'profile'] });
  });

  it('keeps password writes out of query data and still invalidates the profile', async () => {
    const { result } = renderHook(() => useTrainerProfileMutations());
    const values = { currentPassword: 'old', newPassword: 'new' } as never;

    await act(async () => {
      await result.current.updatePassword({ values, idempotencyKey: 'password-1' });
    });

    expect(api.updatePassword).toHaveBeenCalledWith(values, 'password-1');
    expect(setQueryData).not.toHaveBeenCalled();
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_profile', 'profile'] });
  });
});
