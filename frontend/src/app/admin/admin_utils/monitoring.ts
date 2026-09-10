// RESPONSIBILITY: Central error monitoring utility (satisfies Rule 15E mock requirement)
export function logErrorToMonitoring(error: Error & { digest?: string }, context: { module: string, route?: string }) {
  console.error(`[Monitoring API] Error in module: ${context.module}`, {
    message: error.message,
    digest: error.digest,
    stack: error.stack,
    route: context.route,
    timestamp: new Date().toISOString(),
  });
}
