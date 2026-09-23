// RESPONSIBILITY: Provides a small framework-level circuit breaker for outbound infrastructure calls.
// FLOW: External adapter -> SuperadminCircuitBreakerService -> timed request -> success/failure state.
import { Injectable } from '@nestjs/common';
import { SuperadminCircuitBreakerOpenException } from '@/backend_superadmin/superadmin_core/external/superadmin-core-circuit-breaker.exceptions';

interface CircuitState { failures: number; openedAt: number | null; }

@Injectable()
export class SuperadminCircuitBreakerService {
  private readonly states = new Map<string, CircuitState>();
  private readonly failureThreshold = 3;
  private readonly cooldownMs = 30_000;

  /** Executes an external operation while preventing repeated calls to an unhealthy dependency. */
  async execute<T>(name: string, operation: () => Promise<T>): Promise<T> {
    const state = this.states.get(name) ?? { failures: 0, openedAt: null };
    if (state.openedAt && Date.now() - state.openedAt < this.cooldownMs) throw new SuperadminCircuitBreakerOpenException();
    if (state.openedAt) state.openedAt = null;
    try {
      const result = await operation();
      this.states.set(name, { failures: 0, openedAt: null });
      return result;
    } catch (error) {
      const failures = state.failures + 1;
      this.states.set(name, { failures, openedAt: failures >= this.failureThreshold ? Date.now() : null });
      throw error;
    }
  }
}
