// RESPONSIBILITY: Centralizes every route and API endpoint owned or consumed by the Superadmin Integrations feature.
export const SuperadminIntegrationsUrlConfig = {
  PAGES: {
    MAIN: '/superadmin/integrations',
  },
  BACKEND_API: {
    BASE: '/superadmin/integrations',
    GENERATE_API_KEY: '/superadmin/integrations/keys',
  },
} as const;
