/**
 * RESPONSIBILITY: Owns Login-only static labels, copy, asset paths, and demo-role presentation configuration.
 * DATA FLOW: Login views consume these values; no backend/server data is stored here.
 */
export const LoginSharedConstants = {
  ASSETS: {
    LOGO: '/logo.png',
    HERO_IMAGE: '/gym-hero.jpg',
  },
  TEXT: {
    BRAND: 'GymSmart',
    BRAND_TAGLINE: 'Gym Management Made Simple',
    TITLE: 'Run Your Gym.',
    SUBTITLE: 'Not Spreadsheets.',
    HERO_DESCRIPTION: 'The all-in-one gym management platform trusted by fitness businesses across India.',
    SECURE_BADGE: 'System Online & Secure',
    FORM_TITLE: 'Welcome Back',
    FORM_SUBTITLE: 'Sign in to your admin dashboard',
    FORM_EMAIL_LABEL: 'Email Address',
    FORM_EMAIL_PLACEHOLDER: 'admin@gymsmart.com',
    FORM_PASSWORD_LABEL: 'Password',
    FORM_PASSWORD_PLACEHOLDER: '••••••••',
    FORM_SUBMIT: 'Sign In',
    FORM_SUBMITTING: 'Signing in…',
    FORM_SERVER_ERROR: 'We could not sign you in. Please try again.',
    FOOTER: 'Secured with 256-bit encryption · GymSmart ERP',
    BACK_TO_HOME: 'Back to Home',
    BACK_TO_HOME_ARIA: 'Back to landing page',
    SHOW_PASSWORD: 'Show password',
    HIDE_PASSWORD: 'Hide password',
    QUICK_DEMOS: 'Development Demo Logins',
    DEMO_SUPERADMIN: 'Superadmin',
    DEMO_ADMIN: 'Admin',
    DEMO_MANAGER: 'Manager',
    DEMO_TRAINER: 'Trainer',
    HERO_IMAGE_ALT: 'Gym management workspace',
    ERROR_TITLE: 'Login Component Failed',
    ERROR_DESCRIPTION: 'We encountered an unexpected error while loading the login interface.',
    ERROR_RETRY: 'Retry Login',
    ROUTE_ERROR_TITLE: 'We could not load the login page',
    ROUTE_ERROR_DESCRIPTION: 'Please retry the login page. Your credentials have not been changed.',
    ROUTE_ERROR_RETRY: 'Try again',
  },
  HERO_STATS: [
    { value: '500+', label: 'Gyms Managed' },
    { value: '2L+', label: 'Active Members' },
    { value: '99.9%', label: 'Uptime SLA' },
  ],
  HERO_FEATURES: [
    'Members, Plans & Renewals — in one place',
    'Real-time attendance & biometric sync',
    'Finance, HR & Payroll management',
    'WhatsApp & Email automation built-in',
  ],
  DEMO_BUTTONS: [
    { role: 'SUPERADMIN', labelKey: 'DEMO_SUPERADMIN' },
    { role: 'ADMIN', labelKey: 'DEMO_ADMIN' },
    { role: 'MANAGER', labelKey: 'DEMO_MANAGER' },
    { role: 'TRAINER', labelKey: 'DEMO_TRAINER' },
  ],
} as const;

export type LoginDemoRole = (typeof LoginSharedConstants.DEMO_BUTTONS)[number]['role'];
