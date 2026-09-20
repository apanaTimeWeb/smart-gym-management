/**
 * Centralized URL configuration for the trainer_utils module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const TRAINER_TRAINER_UTILS_URLS = {
    PAGES: {
        ROOT: '/trainer/trainer_utils',
    },
    API: {
        BASE: '/api/v1/trainer/trainer_utils',
    }
} as const;
