// RESPONSIBILITY: Defines finite progress-tracking domain enum values used by DTOs and persistence.
// FLOW: progress-tracking DTO/entity → typed enum → API/DB contract.

export enum ProgressSortField { Date = 'date', WeightKg = 'weightKg', Bmi = 'bmi' }
