// RESPONSIBILITY: Defines canonical diet-goal enum values; API labels are handled by TrainerLibraryEnumMapper.
// FLOW: Frontend label → DTO transform → canonical enum → TypeORM enum → API mapper → frontend label.
export enum DietGoal { WEIGHT_LOSS='WEIGHT_LOSS', MAINTENANCE='MAINTENANCE', MUSCLE_GAIN='MUSCLE_GAIN' }
