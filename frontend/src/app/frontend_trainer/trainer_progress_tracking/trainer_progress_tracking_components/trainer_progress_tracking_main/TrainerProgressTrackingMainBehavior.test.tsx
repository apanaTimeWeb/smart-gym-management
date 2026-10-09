import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import TrainerProgressTrackingMain from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_main/TrainerProgressTrackingMain';






const deleteEntry = vi.fn();
const createEntry = vi.fn();
const updateEntry = vi.fn();
const showSuccess = vi.fn();
const showError = vi.fn();
const begin = vi.fn((actionId: string) => `key-${actionId}`);
const clear = vi.fn();
const confirm = vi.fn();

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingFilters', () => ({
  useTrainerProgressTrackingFilters: () => ({
    selectedMemberId: '1', setSelectedMemberId: vi.fn(), activeTab: 'individual', setActiveTab: vi.fn(),
    currentPage: 1, setCurrentPage: vi.fn(), sortBy: 'date', sortDirection: 'desc', setSort: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingQuery', () => ({
  useTrainerProgressTrackingMembersQuery: () => ({ data: [{ id: '1', name: 'Rahul Sharma' }], isPending: false, isError: false, error: null }),
  useTrainerProgressTrackingEntriesQuery: () => ({
    data: { entries: [{ id: 'p1', date: '2026-09-17', weightKg: 80, heightCm: 175 }], total: 1 },
    isPending: false, isError: false, isFetching: false, error: null, refetch: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingMutations', () => ({
  useTrainerProgressTrackingMutations: () => ({ deleteEntry, createEntry, updateEntry, deleteEntryPending: false, createEntryPending: false, updateEntryPending: false }),
}));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingComparisonQueries', () => ({ useTrainerProgressTrackingComparisonQueries: () => [] }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_store/useTrainerProgressTrackingStore', () => ({
  useTrainerProgressTrackingStore: (selector: (s: Record<string, unknown>) => unknown) => selector({
    activeMetric: 'weightKg', setActiveMetric: vi.fn(), showModal: false, setShowModal: vi.fn(), editingEntryId: null, setEditingEntryId: vi.fn(),
    activeComparisonMetric: 'weightKg', setActiveComparisonMetric: vi.fn(), selectedComparisonIds: [], toggleComparisonMember: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureFeedback', () => ({ useTrainerInfrastructureFeedback: () => ({ showSuccess, showError }) }));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureConfirm', () => ({ useTrainerInfrastructureConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey', () => ({ useTrainerInfrastructureIdempotencyKey: () => ({ begin, clear, current: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_chart/TrainerProgressTrackingChart', () => ({ default: () => <div data-testid="trainer_progress_tracking-main-behavior-test-chart" /> }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_table/TrainerProgressTrackingTable', () => ({
  default: (props: { onDelete: (id: string) => void }) => <button type="button" onClick={() => void props.onDelete('p1')} data-testid="trainer_progress_tracking-main-behavior-test-delete-entry">Delete Entry</button>,
}));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_modal/TrainerProgressTrackingModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_empty_state/TrainerProgressTrackingEmptyState', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_member_selector/TrainerProgressTrackingMemberSelector', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_comparison_chart/TrainerProgressTrackingComparisonChart', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_comparison_table/TrainerProgressTrackingComparisonTable', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/trainer_infrastructure_searchable_dropdown/TrainerInfrastructureSearchableDropdown', () => ({ default: () => <div data-testid="trainer_progress_tracking-main-behavior-test-member-selector" /> }));

describe('TrainerProgressTrackingMain behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    begin.mockImplementation((actionId: string) => `key-${actionId}`);
    deleteEntry.mockResolvedValue({ message: 'Progress entry deleted' });
    confirm.mockResolvedValue(true);
  });

  it('routes a table delete action through the module mutation with a stable idempotency key', async () => {
    const user = userEvent.setup();
    render(<TrainerProgressTrackingMain />);
    await user.click(screen.getByRole('button', { name: 'Delete Entry' }));
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ requireTypedConfirmation: true, confirmationPhrase: 'TEXT_DELETE_ENTRY_CONFIRMATION' }));
    expect(deleteEntry).toHaveBeenCalledWith({ memberId: '1', entryId: 'p1', idempotencyKey: 'key-delete-p1' });
    expect(clear).toHaveBeenCalledWith('delete-p1');
    expect(showSuccess).toHaveBeenCalledWith('Progress entry deleted', 'progress-delete-p1');
  });
  it('does not call the delete API when the typed confirmation is declined', async () => {
    confirm.mockResolvedValue(false);
    const user = userEvent.setup();
    render(<TrainerProgressTrackingMain />);
    await user.click(screen.getByRole('button', { name: 'Delete Entry' }));
    expect(deleteEntry).not.toHaveBeenCalled();
    expect(begin).not.toHaveBeenCalled();
  });

});
