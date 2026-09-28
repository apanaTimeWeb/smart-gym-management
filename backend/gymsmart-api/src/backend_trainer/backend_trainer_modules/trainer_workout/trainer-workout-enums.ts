// RESPONSIBILITY: Defines canonical workout domain enum values; API labels are handled by TrainerWorkoutEnumMapper.
// FLOW: Frontend label → DTO transform → canonical enum → TypeORM enum → API mapper → frontend label.
export enum WorkoutLevel { BEGINNER='BEGINNER', INTERMEDIATE='INTERMEDIATE', ADVANCED='ADVANCED' }
export enum ExerciseDifficulty { BEGINNER='BEGINNER', INTERMEDIATE='INTERMEDIATE', ADVANCED='ADVANCED' }
