/**
 * Centralized URL configuration for the manager_components module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const MANAGER_MANAGER_COMPONENTS_URLS = {
    PAGES: {
        ROOT: '/manager/manager_components',
    },
    API: {
        BASE: '/api/v1/manager/manager_components',
    }
} as const;
