import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainerProfileMain from '@/app/trainer/profile/profile_components/TrainerProfileMain/TrainerProfileMain';
vi.mock('@/app/trainer/profile/profile_hooks/useTrainerProfileLogic', () => ({ useTrainerProfileLogic: () => ({
  profileForm: { handleSubmit: (fn: (v: { name: string }) => void) => (e: Event) => { e.preventDefault(); fn({ name: 'Trainer One' }); }, register: () => ({}), formState: { errors: {} } },
  passwordForm: { handleSubmit: () => (e: Event) => e.preventDefault(), register: () => ({}), formState: { errors: {} } },
  user: { name: 'Trainer One', email: 'trainer@example.com' }, activeTab: 'security', setActiveTab: vi.fn(), profileMutation: { mutate: vi.fn(), isPending: false }, passwordMutation: { mutate: vi.fn(), isPending: false }, isPending: false, isError: false, isDirty: false, displayInitial: 'T',
}) }));
vi.mock('@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges', () => ({ useTrainerUnsavedChangesGuard: () => async (action: () => void) => action() }));
describe('TrainerProfileMain behavior', () => {
  it('toggles password visibility with an accessible control', async () => {
    const user = userEvent.setup();
    render(<TrainerProfileMain />);
    const inputs = screen.getAllByRole('textbox');
    const buttons = screen.getAllByRole('button', { name: 'Show password' });
    expect(inputs).toHaveLength(3);
    await user.click(buttons[0]);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });
});
