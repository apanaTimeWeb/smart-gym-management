import { describe, expect, it, vi } from 'vitest';
import { trainerProfileApi } from '@/app/trainer/profile/profile_api/TrainerProfileApi';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

const PROFILE = { id: 'tr-1', name: 'Trainer One', email: 'trainer@example.com', phone: '9000000000', role: 'TRAINER', specialization: ['Strength'], joinedAt: '2026-01-01', avatarInitial: 'T' };

describe('Trainer profile API behavior', () => {
  it('updates the profile through the module endpoint and preserves the response contract', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Profile updated', data: PROFILE });
    const result = await trainerProfileApi.updateProfile({ name: 'Trainer One', phone: '9000000000', specialization: ['Strength'] });
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH' });
    expect(result.data?.name).toBe('Trainer One');
  });
  it('surfaces the backend password-update message', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Password updated', data: null });
    const result = await trainerProfileApi.updatePassword({ currentPassword: 'old-password', newPassword: 'new-password', confirmPassword: 'new-password' });
    expect(result.message).toBe('Password updated');
  });
});
