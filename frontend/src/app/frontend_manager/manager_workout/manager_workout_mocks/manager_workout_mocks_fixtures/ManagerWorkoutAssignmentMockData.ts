import type { ManagerWorkoutAssignment } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutAssignmentTypes';

/**
 * @description Provides the ManagerWorkoutAssignmentMockData implementation for the workout module.
 * @dependencies @/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutAssignmentTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_WORKOUT_ASSIGNMENTS: ManagerWorkoutAssignment[] = [
  { id: 'wa-1', memberName: 'Amit Sharma', planName: 'Beginner Weight Loss', assignedBy: 'Vikram (Head Trainer)', startDate: '2026-09-01T00:00:00Z' },
  { id: 'wa-2', memberName: 'Neha Verma', planName: 'Advanced Hypertrophy', assignedBy: 'Rahul (Strength)', startDate: '2026-09-05T00:00:00Z' },
];
