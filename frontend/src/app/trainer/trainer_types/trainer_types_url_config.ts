/**
 * Centralized URL configuration for the trainer_types module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const TRAINER_TRAINER_TYPES_URLS = {
    PAGES: {
        ROOT: '/trainer/trainer_types',
    },
    API: {
        BASE: '/api/v1/trainer/trainer_types',
    }
} as const;
