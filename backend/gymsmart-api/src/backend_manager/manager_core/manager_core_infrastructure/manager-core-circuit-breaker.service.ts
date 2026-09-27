// RESPONSIBILITY: Provides a bounded, feature-safe circuit breaker for Manager external-provider adapters.
// FLOW: Adapter -> circuit state check -> downstream operation -> success reset / failure accumulation.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';

interface CircuitState { failures: number; openedAt: number | null; }

@Injectable()
export class ManagerCoreCircuitBreakerService {
  private readonly states = new Map<string, CircuitState>();
  private readonly failureThreshold = 5;
  private readonly resetAfterMs = 30_000;

  /** @description Executes an operation through a bounded circuit breaker. @param key - Stable downstream identifier. @param operation - Outbound operation. @returns Operation result. @throws Error when the circuit is open or the operation fails. */
  async execute<T>(key: string, operation: () => Promise<T>): Promise<T> {
    const current = this.states.get(key) ?? { failures: 0, openedAt: null };
    if (current.openedAt !== null && Date.now() - current.openedAt < this.resetAfterMs) throw new ManagerCoreBusinessException('core.ERRORS.CIRCUIT_OPEN', 'CORE.CIRCUIT.OPEN', HttpStatus.SERVICE_UNAVAILABLE);
    if (current.openedAt !== null) current.openedAt = null;
    try {
      const result = await operation();
      this.states.set(key, { failures: 0, openedAt: null });
      return result;
    } catch (error) {
      const next = { failures: current.failures + 1, openedAt: current.failures + 1 >= this.failureThreshold ? Date.now() : null };
      this.states.set(key, next);
      throw error;
    }
  }
}
