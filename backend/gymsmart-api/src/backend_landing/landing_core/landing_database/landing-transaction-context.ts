// RESPONSIBILITY: Defines the application transaction boundary without exposing ORM transaction objects to business services.
// FLOW: Orchestrator -> LandingCoreUnitOfWork -> infrastructure transaction scope -> service/repository calls.

/**
 * Intent: Represent the only transaction capability visible above the infrastructure adapter.
 * Edge Cases: The callback must fail closed when no tenant DataSource is available; callback errors trigger rollback in the adapter.
 * Side Effects: None; this contract contains no ORM or persistence implementation details.
 * AI Notes: Never add EntityManager, QueryRunner, Repository, DataSource, or TypeORM types to this application-facing contract.
 */
export interface LandingCoreUnitOfWork {
  /**
   * @description Executes application work inside the trusted tenant database transaction.
   * @param work - Application callback that uses repository abstractions without ORM transaction objects.
   * @returns The callback result after a successful commit.
   */
  runInTransaction<T>(work: () => Promise<T>): Promise<T>;
}
