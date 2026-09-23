// RESPONSIBILITY: Deterministic idempotent seed hook for Manager expenses.
// FLOW: Master seed orchestrator -> ExpensesSeeder.seed() -> tenant repository.
export class ExpensesSeeder {
  /** @description Runs the deterministic seed hook for Manager expenses. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
