// RESPONSIBILITY: Deterministic idempotent seed hook for Manager attendance.
// FLOW: Master seed orchestrator -> AttendanceSeeder.seed() -> tenant repository.
export class AttendanceSeeder {
  /** @description Runs the deterministic seed hook for Manager attendance. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
