export interface Workout {
 id: number;
 name: string;
 level: string;
 days: number;
 exercises: number;
 focus: string;
 duration: string;
 tags: string[];
}

export interface Exercise {
 id: number;
 name: string;
 muscle: string;
 equipment: string;
 difficulty: string;
}

export const INITIAL_WORKOUTS: Workout[] = [
 { id: 1, name: 'Push Pull Legs', level: 'Intermediate', days: 6, exercises: 24, focus: 'Hypertrophy', duration: '75 min', tags: ['PPL', 'Classic'] },
 { id: 2, name: 'Full Body Strength', level: 'Beginner', days: 3, exercises: 12, focus: 'Strength', duration: '45 min', tags: ['Compound', 'Beginner'] },
 { id: 3, name: 'Arnold Split', level: 'Advanced', days: 6, exercises: 30, focus: 'Bodybuilding', duration: '90 min', tags: ['Classic', 'Volume'] },
 { id: 4, name: 'HIIT Fat Burn', level: 'Intermediate', days: 4, exercises: 18, focus: 'Cardio', duration: '40 min', tags: ['HIIT', 'Cardio'] },
 { id: 5, name: 'Calisthenics', level: 'Beginner', days: 4, exercises: 15, focus: 'Bodyweight', duration: '50 min', tags: ['Bodyweight', 'Flexible'] },
 { id: 6, name: 'Powerlifting Program',level: 'Advanced', days: 4, exercises: 10, focus: 'Strength', duration: '80 min', tags: ['Powerlifting', 'Heavy'] },
];

export const INITIAL_EXERCISES: Exercise[] = [
 { id: 1, name: 'Barbell Squat', muscle: 'Quadriceps', equipment: 'Barbell', difficulty: 'Intermediate' },
 { id: 2, name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Beginner' },
 { id: 3, name: 'Deadlift', muscle: 'Posterior Chain', equipment: 'Barbell', difficulty: 'Advanced' },
 { id: 4, name: 'Pull-Up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
 { id: 5, name: 'Shoulder Press', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
 { id: 6, name: 'Romanian Deadlift',muscle: 'Hamstrings', equipment: 'Barbell', difficulty: 'Intermediate' },
];

export const EMPTY_WORKOUT_FORM = { 
 name: '', 
 level: 'Beginner', 
 days: '', 
 exercises: '', 
 focus: '', 
 duration: '', 
 tags: '' 
};

export const EMPTY_EXERCISE_FORM = { 
 name: '', 
 muscle: '', 
 equipment: 'Barbell', 
 difficulty: 'Beginner' 
};
