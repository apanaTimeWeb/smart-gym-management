// RESPONSIBILITY: Represents fatal startup configuration validation failures in the core runtime.
// FLOW: Config schema failure → typed startup exception → process fails before serving requests.

  /**
 * Intent: Defines the CoreEnvironmentValidationException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreEnvironmentValidationException extends Error {
  constructor(details: string) {
    super(`CORE.CONFIG.STARTUP_VALIDATION_FAILED: ${details}`);
    this.name = 'CoreEnvironmentValidationException';
  }
}
