// RESPONSIBILITY: Central error monitoring utility (satisfies Rule 15E mock requirement)
class ProductionLogger {
  static captureException(error: Error, extra: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'production') {
      // Mock sending to Sentry/Datadog
      fetch('/api/admin/system/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: error.message, stack: error.stack, extra })
      }).catch(() => {});
    } else {
      console.error(`[Dev Monitoring API] Error in module: ${extra.module}`, {
        message: error.message,
        stack: error.stack,
        ...extra
      });
    }
  }
}

export function logErrorToMonitoring(error: Error & { digest?: string }, context: { module: string, route?: string }) {
  ProductionLogger.captureException(error, {
    digest: error.digest,
    route: context.route,
    module: context.module,
    timestamp: new Date().toISOString(),
  });
}
