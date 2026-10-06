// RESPONSIBILITY: Captures Admin module errors through the approved monitoring transport without exposing internal error details to users.
import { ADMIN_MONITORING_LOG_URL } from '@/app/frontend_admin/admin_layout/admin_layout_url_config';
/**
 * ignoreMonitoringFailure provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
function ignoreMonitoringFailure(error: unknown): void {
  void error;
}

class ProductionLogger {
  static captureException(error: Error, extra: Record<string, unknown>) {
    // The approved global monitoring transport receives sanitized Admin diagnostics.
    fetch(ADMIN_MONITORING_LOG_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message, extra })
    }).catch(ignoreMonitoringFailure);
  }
}

/**
 * logErrorToMonitoring provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function logErrorToMonitoring(error: Error & { digest?: string }, context: { module: string, route?: string }) {
  ProductionLogger.captureException(error, {
    digest: error.digest,
    route: context.route,
    module: context.module,
    timestamp: new Date().toISOString(),
  });
}
