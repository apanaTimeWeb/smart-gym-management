// RESPONSIBILITY: Deterministic idempotent seed hook for Manager pt.
// FLOW: Master seed orchestrator -> PtSeeder.seed() -> tenant repository.
export class PtSeeder {
  /** @description Runs the deterministic seed hook for Manager pt. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
