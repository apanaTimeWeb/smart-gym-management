// RESPONSIBILITY: Defines circuit-breaker failures as machine-readable infrastructure exceptions.
// FLOW: SuperadminCircuitBreakerService -> SuperadminCircuitBreakerOpenException -> SuperadminDomainExceptionFilter.
import { ServiceUnavailableException } from '@nestjs/common';

/** Rejects outbound work while a dependency circuit is open. */
export class SuperadminCircuitBreakerOpenException extends ServiceUnavailableException {
  constructor() {
    super({ error: 'SERVICE_UNAVAILABLE', errorCode: 'EXTERNAL.CIRCUIT.OPEN', message: { key: 'core.ERRORS.CIRCUIT_OPEN' } });
  }
}
