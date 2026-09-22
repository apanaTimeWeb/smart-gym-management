// RESPONSIBILITY: Centralized runtime enum/configuration for Manager library.
// FLOW: DTO/entity/query allowlists -> Library feature behavior.

export enum LibraryView {
  DIET = 'diet',
  EXERCISES = 'exercises',
}

export enum ManagerLibraryNutrientKey {
  CALORIES = 'calories',
  PROTEIN = 'protein',
  CARBS = 'carbs',
  FATS = 'fats',
}

export enum LibraryRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const LibraryAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum LibraryCategory {
  DIET = 'Diet',
  STRENGTH = 'Strength',
  CARDIO = 'Cardio',
  FLEXIBILITY = 'Flexibility',
  OTHER = 'Other',
}
