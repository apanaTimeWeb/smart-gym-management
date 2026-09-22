// RESPONSIBILITY: Deterministic idempotent seed hook for Manager members.
// FLOW: Master seed orchestrator -> MembersSeeder.seed() -> tenant repository.
export class MembersSeeder {
  /** @description Runs the deterministic seed hook for Manager members. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
