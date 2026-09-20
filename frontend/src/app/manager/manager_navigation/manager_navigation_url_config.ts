/**
 * Centralized URL configuration for the manager_navigation module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const MANAGER_MANAGER_NAVIGATION_URLS = {
    PAGES: {
        ROOT: '/manager/manager_navigation',
    },
    API: {
        BASE: '/api/v1/manager/manager_navigation',
    }
} as const;
