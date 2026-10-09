import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerWorkoutMain from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_main/TrainerWorkoutMain';




vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_hooks/useTrainerWorkoutFilters', () => ({ useTrainerWorkoutFilters: () => ({ tab: 'plans' }) }));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_banner/TrainerWorkoutBanner', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_toolbar/TrainerWorkoutToolbar', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_plans_grid/TrainerWorkoutPlansGrid', () => ({ default: () => <div data-testid="trainer_workout-main-behavior-test-plans">TrainerWorkoutWorkout plan</div> }));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_exercise_table/TrainerWorkoutExerciseTable', () => ({ default: () => <div data-testid="trainer_workout-main-behavior-test-exercises">TrainerWorkoutExercise</div> }));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_modal/TrainerWorkoutModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_exercise_modal/TrainerWorkoutExerciseModal', () => ({ default: () => null }));
describe('TrainerWorkoutMain behavior', () => {
  it('renders the active workout-plan surface from feature state', () => {
    render(<TrainerWorkoutMain />);
    expect(screen.getByTestId('trainer_workout-main-behavior-test-plans')).toHaveTextContent('TrainerWorkoutWorkout plan');
  });
});
