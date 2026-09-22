// RESPONSIBILITY: Defines the deterministic, idempotent seed entry point for the sessions feature.
// FLOW: Core seed runner → SessionsSeeder.run() → feature-owned repository state.

import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsSeeder {
  /** Executes the feature seed; the empty seed is intentionally safe until deterministic fixtures are approved. */
  async run(): Promise<void> {
    return;
  }
}
