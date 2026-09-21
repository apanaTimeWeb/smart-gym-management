// RESPONSIBILITY: Re-exports feature enum vocabulary for migrations without a barrel file.
// FLOW: DTO/entity -> enum constant.
export const MigrationsSortFields = ['createdAt', 'updatedAt'] as const;
