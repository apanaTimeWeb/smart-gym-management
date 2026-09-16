import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerLibraryMain from '@/app/trainer/library/library_components/TrainerLibraryMain/TrainerLibraryMain';

vi.mock('@/app/trainer/library/library_context/TrainerUseLibraryLogic', () => ({
  useTrainerLibraryLogic: () => ({
    dietPlans: [{ id: 'd1', name: 'Lean Plan', goal: 'Weight Loss', meals: [], isActive: true }],
    totalDietPlans: 1,
    isPending: false,
    isError: false,
    search: 'Lean',
    filterGoal: 'Weight Loss',
    currentPage: 1,
    setSearch: vi.fn(),
    setFilterGoal: vi.fn(),
    setCurrentPage: vi.fn(),
    loadAll: vi.fn(),
    showDietModal: false,
    editDietData: null,
    openEditDiet: vi.fn(),
    closeDietModal: vi.fn(),
  }),
}));

vi.mock('@/app/trainer/library/library_components/TrainerLibraryTabs/TrainerLibraryTabs', () => ({ default: (props: { search: string }) => <div data-testid="library-tabs">Search: {props.search}</div> }));
vi.mock('@/app/trainer/library/library_components/TrainerLibraryDietGrid/TrainerLibraryDietGrid', () => ({ default: (props: { dietPlans: Array<{ name: string }> }) => <div data-testid="diet-grid">{props.dietPlans[0]?.name}</div> }));
vi.mock('@/app/trainer/library/library_components/TrainerLibraryDietModal/TrainerLibraryDietModal', () => ({ default: () => null }));

describe('TrainerLibraryMain behavior', () => {
  it('renders server-backed diet data from the query logic without legacy toast state', () => {
    render(<TrainerLibraryMain />);
    expect(screen.getByTestId('library-tabs')).toHaveTextContent('Search: Lean');
    expect(screen.getByTestId('diet-grid')).toHaveTextContent('Lean Plan');
  });
});
