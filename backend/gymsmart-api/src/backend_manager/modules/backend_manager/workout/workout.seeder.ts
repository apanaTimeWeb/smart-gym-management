// RESPONSIBILITY: Deterministic idempotent seed hook for Manager workout.
// FLOW: Master seed orchestrator -> WorkoutSeeder.seed() -> tenant repository.
export class WorkoutSeeder {
  /** @description Runs the deterministic seed hook for Manager workout. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
