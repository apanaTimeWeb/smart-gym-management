export const CATEGORIES = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Full Body', 'Yoga'];

export const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export const GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility'];

export const DIFF_COLORS: Record<string, string> = {
 BEGINNER: 'bg-[var(--success-bg)] text-[var(--success)]',
 INTERMEDIATE: 'bg-[var(--warning-bg)] text-[var(--warning)]',
 ADVANCED: 'bg-[var(--danger-bg)] text-[var(--danger)]',
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
