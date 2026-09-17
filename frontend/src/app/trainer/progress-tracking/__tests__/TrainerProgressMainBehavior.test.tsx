import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainerProgressMain from '@/app/trainer/progress-tracking/progress_components/TrainerProgressMain/TrainerProgressMain';
const confirm = vi.fn().mockResolvedValue(false);
const deleteEntry = vi.fn();
vi.mock('@/app/trainer/progress-tracking/progress_utils/useTrainerProgressFilters', () => ({ useTrainerProgressFilters: () => ({ selectedMemberId: '1', setSelectedMemberId: vi.fn(), activeTab: 'individual', setActiveTab: vi.fn() }) }));
vi.mock('@/app/trainer/progress-tracking/progress_queries/useTrainerProgressQuery', () => ({ useTrainerProgressMembersQuery: () => ({ data: [{ id: '1', name: 'Rahul Sharma' }] }), useTrainerProgressEntriesQuery: () => ({ data: [{ id: 'p1', date: '2026-09-17', weightKg: 80, heightCm: 175 }] }) }));
vi.mock('@/app/trainer/progress-tracking/progress_queries/useTrainerProgressMutations', () => ({ useTrainerProgressMutations: () => ({ deleteEntry: { mutate: deleteEntry }, createEntry: { mutate: vi.fn() }, updateEntry: { mutate: vi.fn() } }) }));
vi.mock('@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('@/app/trainer/progress-tracking/progress_api/TrainerProgressApi', () => ({ fetchProgressEntries: vi.fn().mockResolvedValue([]) }));
vi.mock('@/app/trainer/progress-tracking/progress_store/useTrainerProgressStore', () => ({ useTrainerProgressStore: (selector: (s: Record<string, unknown>) => unknown) => selector({ activeMetric: 'weightKg', setActiveMetric: vi.fn(), showModal: false, setShowModal: vi.fn(), editingEntry: null, setEditingEntry: vi.fn(), activeComparisonMetric: 'weightKg', setActiveComparisonMetric: vi.fn(), selectedComparisonIds: [], toggleComparisonMember: vi.fn() }) }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressChart/TrainerProgressChart', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressTable/TrainerProgressTable', () => ({ default: (props: { onDelete: (id: string) => void }) => <button onClick={() => props.onDelete('p1')}>Delete Entry</button> }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressModal/TrainerProgressModal', () => ({ default: () => null }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressEmptyState/TrainerProgressEmptyState', () => ({ default: () => null }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressMemberSelector/TrainerProgressMemberSelector', () => ({ default: () => null }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressComparisonChart/TrainerProgressComparisonChart', () => ({ default: () => null }));
vi.mock('@/app/trainer/progress-tracking/progress_components/TrainerProgressComparisonTable/TrainerProgressComparisonTable', () => ({ default: () => null }));
vi.mock('@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown', () => ({ default: () => <div /> }));
describe('TrainerProgressMain behavior', () => {
  it('blocks deletion when confirmation is declined', async () => {
    const user = userEvent.setup();
    render(<TrainerProgressMain />);
    await user.click(screen.getByRole('button', { name: 'Delete Entry' }));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(deleteEntry).not.toHaveBeenCalled();
  });
});
