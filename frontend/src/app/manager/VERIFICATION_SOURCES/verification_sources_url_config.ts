/**
 * Centralized URL configuration for the VERIFICATION_SOURCES module.
 * No URLs should be hardcoded directly in components or API services.
 */

export const MANAGER_VERIFICATION_SOURCES_URLS = {
    PAGES: {
        ROOT: '/manager/VERIFICATION_SOURCES',
    },
    API: {
        BASE: '/api/v1/manager/VERIFICATION_SOURCES',
    }
} as const;
