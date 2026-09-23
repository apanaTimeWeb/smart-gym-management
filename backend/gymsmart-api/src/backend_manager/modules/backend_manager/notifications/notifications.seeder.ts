// RESPONSIBILITY: Deterministic idempotent seed hook for Manager notifications.
// FLOW: Master seed orchestrator -> NotificationsSeeder.seed() -> tenant repository.
export class NotificationsSeeder {
  /** @description Runs the deterministic seed hook for Manager notifications. @returns Nothing. */
  async seed(): Promise<void> { return; }
}
