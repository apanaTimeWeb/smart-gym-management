// RESPONSIBILITY: Provides AsyncLocalStorage-backed request context without parameter prop-drilling.
// FLOW: LandingRequestContextMiddleware â†’ LandingRequestContextService â†’ deep services/repositories.
import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import type { LandingRequestContextValue } from '@/backend_landing/landing_core/landing_types/landing-request-context.types';


/**
 * Intent: Defines the LandingRequestContextService class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing request context service boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingRequestContextService {
  private readonly storage = new AsyncLocalStorage<LandingRequestContextValue>();

  /** @description Runs callback execution with request correlation and tenant context. @param context - Mutable request context. @param callback - Downstream request callback. @returns Callback result. */
  
  /**
   * Intent: Preserve the single responsibility of landing-request-context.service.run at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
run<T>(context: LandingRequestContextValue, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  /** @description Reads the active request context. @returns Current context. @throws Error when execution is outside the request boundary. */
  
  /**
   * Intent: Preserve the single responsibility of landing-request-context.service.get at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
get(): LandingRequestContextValue {
    const context = this.storage.getStore();
    if (!context) throw new Error('REQUEST_CONTEXT_UNAVAILABLE');
    return context;
  }

  /** @description Assigns the already-authorized tenant identifier to the active request. @param tenantId - Trusted tenant UUID. @returns Nothing. */
  
  /**
   * Intent: Preserve the single responsibility of landing-request-context.service.setTenantId at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
setTenantId(tenantId: string): void {
    const context = this.get();
    context.tenantId = tenantId;
  }
}
