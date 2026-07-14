// RESPONSIBILITY: Single source of truth for all routes and anchor links used in the Landing module.
// Import from this file whenever navigating to a page or jumping to a section — no hardcoded strings in JSX.
export const LandingUrlConfig = {
  PAGES: {
    HOME:       '/',
    ERP_LOGIN:  '/auth/login',
    SAAS_LOGIN: '/superadmin/dashboard',
    DASHBOARD:  '/erp/dashboard',
  },
  ANCHORS: {
    HOME:            '#home',
    ABOUT:           '#about',
    SERVICES:        '#services',
    PLANS:           '#plans',
    SCHEDULE:        '#schedule',
    TRAINERS:        '#trainers',
    GALLERY:         '#gallery',
    TESTIMONIALS:    '#testimonials',
    CONTACT:         '#contact',
    BOOKING:         '#booking',
    TRANSFORMATIONS: '#transformations',
  },
} as const;
