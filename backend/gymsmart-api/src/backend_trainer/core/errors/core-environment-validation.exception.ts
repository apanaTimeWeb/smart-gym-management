// RESPONSIBILITY: Represents fatal startup configuration validation failures in the core runtime.
// FLOW: Config schema failure → typed startup exception → process fails before serving requests.

export class CoreEnvironmentValidationException extends Error {
  constructor(details: string) {
    super(`CORE.CONFIG.STARTUP_VALIDATION_FAILED: ${details}`);
    this.name = 'CoreEnvironmentValidationException';
  }
}
