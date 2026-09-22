// RESPONSIBILITY: Deterministic idempotent seed hook for Manager reports.
// FLOW: Master seed orchestrator -> ReportsSeeder.seed() -> tenant repository.
export class ReportsSeeder {
  /** @description Runs the deterministic seed hook for Manager reports. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
