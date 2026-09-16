import type { Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';

export const MOCK_MANAGER_EXERCISES: Exercise[] = [
  {
    id: 'ex-201',
    name: 'Bench Press',
    muscleGroup: ['Chest', 'Triceps', 'Shoulders'],
    category: 'Barbell',
    difficulty: 'INTERMEDIATE',
    isActive: true
  },
  {
    id: 'ex-202',
    name: 'Squat',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    category: 'Barbell',
    difficulty: 'INTERMEDIATE',
    isActive: true
  },
  {
    id: 'ex-203',
    name: 'Push-up',
    muscleGroup: ['Chest', 'Triceps', 'Core'],
    category: 'Bodyweight',
    difficulty: 'BEGINNER',
    isActive: true
  },
  {
    id: 'ex-204',
    name: 'Pull-up',
    muscleGroup: ['Back', 'Biceps'],
    category: 'Bodyweight',
    difficulty: 'ADVANCED',
    isActive: true
  },
  {
    id: 'ex-205',
    name: 'Dumbbell Curl',
    muscleGroup: ['Biceps'],
    category: 'Dumbbells',
    difficulty: 'BEGINNER',
    isActive: true
  }
];
