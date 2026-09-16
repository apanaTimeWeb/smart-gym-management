import type { ManagerWorkoutAssignment } from '@/app/manager/workout/workout_types/ManagerWorkoutAssignmentTypes';

export const MOCK_WORKOUT_ASSIGNMENTS: ManagerWorkoutAssignment[] = [
  { id: 'wa-1', memberName: 'Amit Sharma', planName: 'Beginner Weight Loss', assignedBy: 'Vikram (Head Trainer)', startDate: '2026-09-01T00:00:00Z' },
  { id: 'wa-2', memberName: 'Neha Verma', planName: 'Advanced Hypertrophy', assignedBy: 'Rahul (Strength)', startDate: '2026-09-05T00:00:00Z' },
];
