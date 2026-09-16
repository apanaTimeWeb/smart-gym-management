import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerWorkoutMain from '@/app/trainer/workout/workout_components/TrainerWorkoutMain/TrainerWorkoutMain';
vi.mock('@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters', () => ({ useTrainerWorkoutFilters: () => ({ tab: 'Workout Plans' }) }));
vi.mock('@/app/trainer/workout/workout_components/TrainerWorkoutBanner/TrainerWorkoutBanner', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/workout/workout_components/TrainerWorkoutToolbar/TrainerWorkoutToolbar', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/workout/workout_components/TrainerWorkoutPlansGrid/TrainerWorkoutPlansGrid', () => ({ default: () => <div data-testid="plans">Workout plan</div> }));
vi.mock('@/app/trainer/workout/workout_components/TrainerWorkoutExerciseTable/TrainerWorkoutExerciseTable', () => ({ default: () => <div data-testid="exercises">Exercise</div> }));
vi.mock('@/app/trainer/workout/workout_components/TrainerWorkoutModal/TrainerWorkoutModal', () => ({ default: () => null }));
vi.mock('@/app/trainer/workout/workout_components/TrainerWorkoutExerciseModal/TrainerWorkoutExerciseModal', () => ({ default: () => null }));
describe('TrainerWorkoutMain behavior', () => {
  it('renders the active workout-plan surface from feature state', () => {
    render(<TrainerWorkoutMain />);
    expect(screen.getByTestId('plans')).toHaveTextContent('Workout plan');
  });
});
