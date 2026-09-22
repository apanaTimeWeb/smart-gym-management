// RESPONSIBILITY: Deterministic idempotent seed hook for Manager plans.
// FLOW: Master seed orchestrator -> PlansSeeder.seed() -> tenant repository.
export class PlansSeeder {
  /** @description Runs the deterministic seed hook for Manager plans. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
