// RESPONSIBILITY: Centralized runtime enum/configuration for Manager workout.
// FLOW: DTO/entity/query allowlists -> Workout feature behavior.

export enum WorkoutRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const WorkoutAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum WorkoutLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}
