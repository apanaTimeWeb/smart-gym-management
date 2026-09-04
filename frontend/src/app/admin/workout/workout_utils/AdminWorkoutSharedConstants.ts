export const ADMIN_WORKOUT_LEVELS = ["Beginner","Intermediate","Advanced"];
export const ADMIN_EXERCISE_MUSCLES = ["Chest","Back","Shoulders","Arms","Legs","Core","Full Body","Cardio"];
export const ADMIN_EXERCISE_DIFFICULTIES = ["Easy","Medium","Hard"];
export const ADMIN_WORKOUT_TABS = [{ id: "plans", label: "Workout Plans" }, { id: "exercises", label: "Exercise Library" }];
export const ADMIN_EMPTY_WORKOUT = { name: "", description: "", level: "Beginner" as const, duration: 45, tags: [], exercises: [], category: "Strength" };
export const ADMIN_EMPTY_EXERCISE = { name: "", muscle: "Chest", equipment: "None", difficulty: "Medium" as const, description: "", sets: 3, reps: 12 };
