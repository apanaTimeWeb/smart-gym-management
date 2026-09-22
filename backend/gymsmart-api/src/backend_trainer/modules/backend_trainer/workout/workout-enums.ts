// RESPONSIBILITY: Defines finite workout level and exercise difficulty values for DTOs and persistence.
// FLOW: workout DTO/entity → typed enum → API/DB contract.

export enum WorkoutLevel { BEGINNER='Beginner', INTERMEDIATE='Intermediate', ADVANCED='Advanced' }
export enum ExerciseDifficulty { BEGINNER='Beginner', INTERMEDIATE='Intermediate', ADVANCED='Advanced' }
