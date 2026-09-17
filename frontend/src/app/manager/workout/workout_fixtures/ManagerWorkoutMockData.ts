import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';

export const MOCK_MANAGER_WORKOUTS: Workout[] = [
  {
    id: 'wk-101',
    name: 'Beginner Full Body',
    level: 'BEGINNER',
    days: 3,
    exercises: 8,
    focus: 'General Fitness',
    duration: '45 min',
    tags: ['Full Body', 'No Equipment', 'Weight Loss']
  },
  {
    id: 'wk-102',
    name: 'Advanced Hypertrophy',
    level: 'ADVANCED',
    days: 5,
    exercises: 12,
    focus: 'Muscle Gain',
    duration: '90 min',
    tags: ['Hypertrophy', 'Free Weights', 'Dumbbells']
  },
  {
    id: 'wk-103',
    name: 'Intermediate Upper/Lower Split',
    level: 'INTERMEDIATE',
    days: 4,
    exercises: 10,
    focus: 'Strength',
    duration: '60 min',
    tags: ['Upper/Lower', 'Barbell', 'Strength']
  },
  {
    id: 'wk-104',
    name: 'Cardio Blast',
    level: 'ALL',
    days: 2,
    exercises: 6,
    focus: 'Endurance',
    duration: '30 min',
    tags: ['HIIT', 'Cardio', 'Stamina']
  },
  {
    id: 'wk-105',
    name: 'Core Strengthening',
    level: 'BEGINNER',
    days: 2,
    exercises: 5,
    focus: 'Core',
    duration: '20 min',
    tags: ['Abs', 'Core', 'Stability']
  }
];
