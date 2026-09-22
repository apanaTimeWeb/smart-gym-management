// RESPONSIBILITY: Deterministic idempotent seed hook for Manager finance.
// FLOW: Master seed orchestrator -> FinanceSeeder.seed() -> tenant repository.
export class FinanceSeeder {
  /** @description Runs the deterministic seed hook for Manager finance. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
