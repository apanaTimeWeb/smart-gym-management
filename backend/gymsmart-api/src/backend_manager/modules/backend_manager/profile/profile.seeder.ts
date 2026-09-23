// RESPONSIBILITY: Deterministic idempotent seed hook for Manager profile.
// FLOW: Master seed orchestrator -> ProfileSeeder.seed() -> tenant repository.
export class ProfileSeeder {
  /** @description Runs the deterministic seed hook for Manager profile. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
