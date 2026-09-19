/**
 * Centralized URL configuration for the manager_infrastructure module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const MANAGER_MANAGER_INFRASTRUCTURE_URLS = {
    PAGES: {
        ROOT: '/manager/manager_infrastructure',
    },
    API: {
        BASE: '/api/v1/manager/manager_infrastructure',
    }
} as const;
