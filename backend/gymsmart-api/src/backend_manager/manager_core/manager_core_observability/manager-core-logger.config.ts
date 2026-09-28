// RESPONSIBILITY: Configures structured Manager request logging with mandatory correlation context and secret redaction.
// FLOW: HTTP request -> nestjs-pino -> request context fields -> redacted structured log.
import type { Params } from 'nestjs-pino';

export const ManagerCoreLoggerConfig: Params = {
  pinoHttp: {
    redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body', 'res.body'],
    customProps: (request: { headers?: Record<string, string | string[] | undefined> }) => ({
      requestId: String(request.headers?.['x-request-id'] ?? ''),
      traceId: String(request.headers?.['x-trace-id'] ?? request.headers?.['x-request-id'] ?? ''),
      tenantId: String(request.headers?.['x-tenant-id'] ?? ''),
    }),
  },
};
