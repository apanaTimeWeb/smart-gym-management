/**
 * Centralized URL configuration for the trainer_e2e module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const TRAINER_TRAINER_E2E_URLS = {
    PAGES: {
        ROOT: '/trainer/trainer_e2e',
    },
    API: {
        BASE: '/api/v1/trainer/trainer_e2e',
    }
} as const;
