/**
 * Centralized URL configuration for the manager_mocks module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const MANAGER_MANAGER_MOCKS_URLS = {
    PAGES: {
        ROOT: '/manager/manager_mocks',
    },
    API: {
        BASE: '/api/v1/manager/manager_mocks',
    }
} as const;
