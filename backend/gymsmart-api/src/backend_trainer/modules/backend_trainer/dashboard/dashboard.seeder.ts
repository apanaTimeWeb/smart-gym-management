// RESPONSIBILITY: Defines the deterministic, idempotent seed entry point for the dashboard feature.
// FLOW: Core seed runner → DashboardSeeder.run() → feature-owned repository state.

import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardSeeder {
  /** Executes the feature seed; the empty seed is intentionally safe until deterministic fixtures are approved. */
  async run(): Promise<void> {
    return;
  }
}
