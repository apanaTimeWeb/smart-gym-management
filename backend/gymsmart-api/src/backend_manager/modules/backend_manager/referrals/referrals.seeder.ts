// RESPONSIBILITY: Deterministic idempotent seed hook for Manager referrals.
// FLOW: Master seed orchestrator -> ReferralsSeeder.seed() -> tenant repository.
export class ReferralsSeeder {
  /** @description Runs the deterministic seed hook for Manager referrals. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
