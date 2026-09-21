// RESPONSIBILITY: Defines persistence-neutral TypeORM target types used by the core repository boundary.
// FLOW: CoreBaseRepository -> CoreDatabaseInterfaces -> TypeORM entity target.

export type CoreEntityClass<TEntity> = { new (): TEntity };
