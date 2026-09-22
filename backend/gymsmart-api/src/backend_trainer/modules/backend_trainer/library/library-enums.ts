// RESPONSIBILITY: Defines finite library goal values for DTOs and TypeORM persistence.
// FLOW: library DTO/entity → typed enum → API/DB contract.

export enum DietGoal { WEIGHT_LOSS='Weight Loss', MAINTENANCE='Maintenance', MUSCLE_GAIN='Muscle Gain' }
