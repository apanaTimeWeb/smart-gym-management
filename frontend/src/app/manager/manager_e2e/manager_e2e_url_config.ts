/**
 * Centralized URL configuration for the manager_e2e module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const MANAGER_MANAGER_E2E_URLS = {
    PAGES: {
        ROOT: '/manager/manager_e2e',
    },
    API: {
        BASE: '/api/v1/manager/manager_e2e',
    }
} as const;
