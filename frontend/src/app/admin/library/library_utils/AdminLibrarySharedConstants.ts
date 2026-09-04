export const ADMIN_DIET_GOALS = ["Weight Loss","Muscle Gain","Maintenance"];
export const ADMIN_LIB_DIFFICULTIES = ["Easy","Medium","Hard"];
export const ADMIN_LIB_TABS = [{ id: "exercises", label: "Exercises" }, { id: "diet", label: "Diet Plans" }];
export const ADMIN_EMPTY_DIET = { name: "", goal: "Maintenance" as const, calories: 2000, protein: 150, carbs: 200, fat: 65, meals: [], description: "" };
export const ADMIN_EMPTY_LIB_EXERCISE = { name: "", category: "Strength", difficulty: "Medium" as const, muscle: "Chest", equipment: "Bodyweight", description: "" };
