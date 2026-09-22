// RESPONSIBILITY: Deterministic idempotent seed hook for Manager communications.
// FLOW: Master seed orchestrator -> CommunicationsSeeder.seed() -> tenant repository.
export class CommunicationsSeeder {
  /** @description Runs the deterministic seed hook for Manager communications. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
