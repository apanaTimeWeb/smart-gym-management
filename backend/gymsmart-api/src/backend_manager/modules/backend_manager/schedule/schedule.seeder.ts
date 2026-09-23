// RESPONSIBILITY: Deterministic idempotent seed hook for Manager schedule.
// FLOW: Master seed orchestrator -> ScheduleSeeder.seed() -> tenant repository.
export class ScheduleSeeder {
  /** @description Runs the deterministic seed hook for Manager schedule. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
