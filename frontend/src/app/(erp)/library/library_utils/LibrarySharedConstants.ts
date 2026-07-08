export const CATEGORIES = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Full Body', 'Yoga'];

export const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export const GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility'];

export const DIFF_COLORS: Record<string, string> = {
  BEGINNER:     'bg-green-100 text-green-700',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-700',
  ADVANCED:     'bg-red-100 text-red-700',
};

export const EMPTY_EXERCISE_FORM = { 
  name: '', 
  category: 'Chest', 
  muscleGroup: '', 
  sets: '', 
  reps: '', 
  duration: '', 
  difficulty: 'BEGINNER', 
  description: '', 
  videoUrl: '' 
};

export const EMPTY_DIET_FORM = { 
  name: '', 
  goal: 'Weight Loss', 
  calories: '', 
  protein: '', 
  carbs: '', 
  fats: '', 
  description: '', 
  meals: '' 
};

export const LIBRARY_TABS = ['Exercises', 'Diet Plans'] as const;
export type LibraryTab = typeof LIBRARY_TABS[number];
