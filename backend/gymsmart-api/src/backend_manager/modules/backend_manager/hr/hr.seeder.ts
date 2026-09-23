// RESPONSIBILITY: Deterministic idempotent seed hook for Manager hr.
// FLOW: Master seed orchestrator -> HrSeeder.seed() -> tenant repository.
export class HrSeeder {
  /** @description Runs the deterministic seed hook for Manager hr. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
