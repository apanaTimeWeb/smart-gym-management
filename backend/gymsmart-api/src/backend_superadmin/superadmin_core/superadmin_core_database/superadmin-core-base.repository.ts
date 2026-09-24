// RESPONSIBILITY: Supplies infrastructure-level soft-delete, fail-fast, transaction, and authorized tenant DataSource primitives for feature repositories.
// FLOW: Feature repository -> BaseRepository -> transaction manager or authorized tenant DataSource -> TypeORM repository -> PostgreSQL.
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';
import { getTenantDataSource } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-context';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';

/**
 * Primary Intent: Defines SuperadminCoreBaseRepository as the class-level contract for superadmin-core-base.repository.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export abstract class SuperadminCoreBaseRepository<TEntity extends { id: string; deletedAt: Date | null }> {
  protected constructor(
    protected readonly repository: Repository<TEntity>,
    protected readonly transactionContext?: SuperadminCoreTransactionContext,
    private readonly tenantScoped = false,
  ) {}

  /** Resolves the repository for the current transaction or authorized tenant context. */
  protected get activeRepository(): Repository<TEntity> {
    const manager = this.transactionContext?.getManager();
    if (manager) return manager.getRepository<TEntity>(this.repository.metadata.target as EntityTarget<TEntity>);
    if (!this.tenantScoped) return this.repository;
    const tenantDataSource = getTenantDataSource();
    if (!tenantDataSource?.isInitialized) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'TENANT.CONTEXT.REQUIRED', message: { key: 'core.ERRORS.FORBIDDEN' } });
    return tenantDataSource.getRepository<TEntity>(this.repository.metadata.target as EntityTarget<TEntity>);
  }

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  protected async findById(id: string): Promise<TEntity | null> {
    return this.activeRepository.findOne({ where: { id, deletedAt: null } as never });
  }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  protected async findByIdOrThrow(id: string, message: string): Promise<TEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: message, message: { key: 'core.ERRORS.NOT_FOUND' } });
    return entity;
  }

  /**
 * Primary Intent: Executes the createActiveQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  protected createActiveQuery(alias: string): SelectQueryBuilder<TEntity> {
    return this.activeRepository.createQueryBuilder(alias).where(`${alias}.deleted_at IS NULL`);
  }

  /**
 * Primary Intent: Executes the findByIdForUpdateOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  protected async findByIdForUpdateOrThrow(id: string, message: string): Promise<TEntity> {
    const manager = this.transactionContext?.getManager();
    if (!manager) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'DATABASE.LOCK.TRANSACTION_REQUIRED', message: { key: 'core.ERRORS.BAD_REQUEST' } });
    const row = await manager.getRepository<TEntity>(this.repository.metadata.target as EntityTarget<TEntity>)
      .createQueryBuilder('item')
      .setLock('pessimistic_write')
      .where('item.id = :id AND item.deleted_at IS NULL', { id })
      .getOne();
    if (!row) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: message, message: { key: 'core.ERRORS.NOT_FOUND' } });
    return row;
  }

  /**
 * Primary Intent: Executes the softDeleteById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  protected async softDeleteById(id: string): Promise<void> {
    await this.activeRepository.update({ id } as never, { deletedAt: new Date() } as never);
  }

  /**
 * Primary Intent: Executes the restoreById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  protected async restoreById(id: string): Promise<TEntity> {
    await this.activeRepository.update({ id } as never, { deletedAt: null } as never);
    const entity = await this.activeRepository.findOne({ where: { id } as never });
    if (!entity) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'CORE.RECORD.NOT_FOUND', message: { key: 'core.ERRORS.NOT_FOUND' } });
    return entity;
  }
}
