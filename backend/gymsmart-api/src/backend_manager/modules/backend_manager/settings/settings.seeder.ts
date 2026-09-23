// RESPONSIBILITY: Deterministic idempotent seed hook for Manager settings.
// FLOW: Master seed orchestrator -> SettingsSeeder.seed() -> tenant repository.
export class SettingsSeeder {
  /** @description Runs the deterministic seed hook for Manager settings. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
