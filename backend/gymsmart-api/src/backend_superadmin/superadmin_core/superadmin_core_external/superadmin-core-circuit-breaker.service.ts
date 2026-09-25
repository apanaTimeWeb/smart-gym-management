// RESPONSIBILITY: Provides a small framework-level circuit breaker for outbound infrastructure calls.
// FLOW: External adapter -> SuperadminCoreCircuitBreakerService -> timed request -> success/failure state.
import { Injectable } from '@nestjs/common';
import { SuperadminCircuitBreakerOpenException } from '@/backend_superadmin/superadmin_core/superadmin_core_external/superadmin-core-circuit-breaker.exceptions';

/**
 * Primary Intent: Defines the CircuitState type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface CircuitState { failures: number; openedAt: number | null; }

/**
 * Primary Intent: Defines SuperadminCoreCircuitBreakerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreCircuitBreakerService {
  private readonly states = new Map<string, CircuitState>();
  private readonly failureThreshold = 3;
  private readonly cooldownMs = 30_000;/**
 * Primary Intent: Executes the execute use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the execute use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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
