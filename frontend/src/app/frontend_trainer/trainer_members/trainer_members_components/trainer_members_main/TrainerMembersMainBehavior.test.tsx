import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerMembersMain from '@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_main/TrainerMembersMain';




vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_store/useTrainerMembersStore', () => ({ useTrainerMembersStore: (selector: (state: { msgModal: null; closeMsg: () => void }) => unknown) => selector({ msgModal: null, closeMsg: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_hooks/useTrainerMembersSelectedMember', () => ({ useTrainerMembersSelectedMember: () => ({ member: null }) }));
vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_message_modal/TrainerMembersMessageModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_kpis/TrainerMembersKPIs', () => ({ default: () => <div data-testid="trainer_members-main-behavior-test-member-kpis" /> }));
vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_toolbar/TrainerMembersToolbar', () => ({ default: () => <input aria-label="Search members" data-testid="trainer_members-trainermemberstoolbar-input-1" /> }));
vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_table/TrainerMembersTable', () => ({ default: () => <div data-testid="trainer_members-main-behavior-test-member-table">Rahul Sharma</div> }));
vi.mock('@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_profile/TrainerMembersProfile', () => ({ default: () => null }));
describe('TrainerMembersMain behavior', () => {
  it('renders the member search surface and server-backed table region', () => {
    render(<TrainerMembersMain />);
    expect(screen.getByRole('textbox', { name: 'Search members' })).toBeInTheDocument();
    expect(screen.getByTestId('trainer_members-main-behavior-test-member-table')).toHaveTextContent('Rahul Sharma');
  });
});
