// RESPONSIBILITY: Defines the deterministic, idempotent seed entry point for the notifications feature.
// FLOW: Core seed runner → TrainerNotificationsSeeder.run() → feature-owned repository state.

import { Injectable } from '@nestjs/common';


/**
 * Intent: Defines the TrainerNotificationsSeeder boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerNotificationsSeeder {
  /** Executes the feature seed; the empty seed is intentionally safe until deterministic fixtures are approved. */
  async run(): Promise<void> {
    return;
  }
}
