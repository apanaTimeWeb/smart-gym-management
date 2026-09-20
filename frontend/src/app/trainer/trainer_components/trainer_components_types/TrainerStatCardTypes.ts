// RESPONSIBILITY: Defines zero-business presentation types/constants used by the generic Trainer stat-card primitive.
export const TRAINER_STAT_CARD_CHANGE_TYPES = ['up', 'down', 'neutral'] as const;
export type TrainerStatCardChangeType = (typeof TRAINER_STAT_CARD_CHANGE_TYPES)[number];

