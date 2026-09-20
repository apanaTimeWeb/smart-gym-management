// RESPONSIBILITY: Centralizes every Landing route, anchor, and API endpoint used by module code.
export const LandingUrlConfig = {
  PAGES: {
    ERP_LOGIN: '/auth/login',
    SAAS_LOGIN: '/superadmin/dashboard',
  },
  ANCHORS: {
    HOME: '#home',
    ABOUT: '#about',
    SERVICES: '#services',
    PLANS: '#plans',
    SCHEDULE: '#schedule',
    TRAINERS: '#trainers',
    GALLERY: '#gallery',
    TESTIMONIALS: '#testimonials',
    CONTACT: '#contact',
    BOOKING: '#booking',
    TRANSFORMATIONS: '#transformations',
  },
  BACKEND_API: {
    BOOKING: '/landing/booking',
    CONTACT: '/landing/contact',
  },
  EXTERNAL: {
    FACEBOOK: 'https://www.facebook.com/',
    INSTAGRAM: 'https://www.instagram.com/',
    X: 'https://x.com/',
    YOUTUBE: 'https://www.youtube.com/',
  },
} as const;
