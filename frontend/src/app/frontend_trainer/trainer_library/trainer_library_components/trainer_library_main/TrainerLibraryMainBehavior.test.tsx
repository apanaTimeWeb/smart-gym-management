import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerLibraryMain from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_main/TrainerLibraryMain';





vi.mock('@/app/frontend_trainer/trainer_library/trainer_library_hooks/useTrainerLibraryLogic', () => ({
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

vi.mock('@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_tabs/TrainerLibraryTabs', () => ({ default: (props: { search: string }) => <div data-testid="trainer_library-main-behavior-test-library-tabs">Search: {props.search}</div> }));
vi.mock('@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_diet_grid/TrainerLibraryDietGrid', () => ({ default: (props: { dietPlans: Array<{ name: string }> }) => <div data-testid="trainer_library-main-behavior-test-diet-grid">{props.dietPlans[0]?.name}</div> }));
vi.mock('@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_diet_modal/TrainerLibraryDietModal', () => ({ default: () => null }));

describe('TrainerLibraryMain behavior', () => {
  it('renders server-backed diet data from the query logic without legacy toast state', () => {
    render(<TrainerLibraryMain />);
    expect(screen.getByTestId('trainer_library-main-behavior-test-library-tabs')).toHaveTextContent('Search: Lean');
    expect(screen.getByTestId('trainer_library-main-behavior-test-diet-grid')).toHaveTextContent('Lean Plan');
  });
});
