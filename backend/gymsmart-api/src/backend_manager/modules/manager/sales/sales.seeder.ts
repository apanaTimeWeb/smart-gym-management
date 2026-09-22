// RESPONSIBILITY: Deterministic idempotent seed hook for Manager sales.
// FLOW: Master seed orchestrator -> SalesSeeder.seed() -> tenant repository.
export class SalesSeeder {
  /** @description Runs the deterministic seed hook for Manager sales. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
