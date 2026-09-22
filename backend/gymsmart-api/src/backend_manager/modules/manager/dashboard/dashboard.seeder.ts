// RESPONSIBILITY: Deterministic idempotent seed hook for Manager dashboard.
// FLOW: Master seed orchestrator -> DashboardSeeder.seed() -> tenant repository.
export class DashboardSeeder {
  /** @description Runs the deterministic seed hook for Manager dashboard. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
