// RESPONSIBILITY: Defines the dependency-injection token for the ORM-neutral Landing transaction boundary.
// FLOW: Landing service -> LANDING_UNIT_OF_WORK token -> LandingTypeormUnitOfWorkService adapter.

/**
 * Intent: Keep application services dependent on the transaction contract rather than on a concrete ORM adapter.
 * Edge Cases: The token must resolve to exactly one trusted UnitOfWork provider in the application container.
 * Side Effects: None; this file only defines the DI identity.
 * AI Notes: Never replace this token with a direct TypeORM service dependency in business services.
 */
export const LANDING_UNIT_OF_WORK = Symbol('LANDING_UNIT_OF_WORK');
