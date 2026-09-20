/**
 * Centralized URL configuration for the trainer_components module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const TRAINER_TRAINER_COMPONENTS_URLS = {
    PAGES: {
        ROOT: '/trainer/trainer_components',
    },
    API: {
        BASE: '/api/v1/trainer/trainer_components',
    }
} as const;
