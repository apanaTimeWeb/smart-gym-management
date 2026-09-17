import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerMembersMain from '@/app/trainer/members/members_components/TrainerMembersMain/TrainerMembersMain';
vi.mock('@/app/trainer/members/members_store/useTrainerMembersStore', () => ({ useTrainerMembersStore: (selector: (state: { msgModal: null; closeMsg: () => void }) => unknown) => selector({ msgModal: null, closeMsg: vi.fn() }) }));
vi.mock('@/app/trainer/members/members_queries/useTrainerSelectedMember', () => ({ useTrainerSelectedMember: () => ({ member: null }) }));
vi.mock('@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal', () => ({ default: () => null }));
vi.mock('@/app/trainer/members/members_components/TrainerMembersKPIs/TrainerMembersKPIs', () => ({ default: () => <div data-testid="member-kpis" /> }));
vi.mock('@/app/trainer/members/members_components/TrainerMembersToolbar/TrainerMembersToolbar', () => ({ default: () => <input aria-label="Search members" /> }));
vi.mock('@/app/trainer/members/members_components/TrainerMembersTable/TrainerMembersTable', () => ({ default: () => <div data-testid="member-table">Rahul Sharma</div> }));
vi.mock('@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfile', () => ({ default: () => null }));
describe('TrainerMembersMain behavior', () => {
  it('renders the member search surface and server-backed table region', () => {
    render(<TrainerMembersMain />);
    expect(screen.getByRole('textbox', { name: 'Search members' })).toBeInTheDocument();
    expect(screen.getByTestId('member-table')).toHaveTextContent('Rahul Sharma');
  });
});
