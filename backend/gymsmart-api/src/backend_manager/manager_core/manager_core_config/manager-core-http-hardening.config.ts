// RESPONSIBILITY: Defines framework-level HTTP hardening settings that must be applied by the real NestJS bootstrap entrypoint.
// FLOW: Bootstrap -> CORS/security/compression options -> HTTP server.
export const MANAGER_CORE_HTTP_HARDENING_CONFIG = {
  compression: { enabled: true, brotli: true, gzip: true },
  cors: { credentials: true, methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'], allowedOriginsEnv: 'FRONTEND_ALLOWED_ORIGINS' },
  securityHeaders: { helmet: true },
  jsonBodyLimit: '1mb',
  gracefulShutdown: ['SIGINT', 'SIGTERM'],
} as const;
