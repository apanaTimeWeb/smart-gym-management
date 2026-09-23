// RESPONSIBILITY: Supplies infrastructure-level soft-delete, fail-fast, transaction, and authorized tenant DataSource primitives for feature repositories.
// FLOW: Feature repository -> BaseRepository -> transaction manager or authorized tenant DataSource -> TypeORM repository -> PostgreSQL.
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';
import { getTenantDataSource } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-datasource-context';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';

export abstract class BaseRepository<TEntity extends { id: string; deletedAt: Date | null }> {
  protected constructor(
    protected readonly repository: Repository<TEntity>,
    protected readonly transactionContext?: SuperadminTransactionContext,
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

  /** Returns a non-deleted record by id or null when it is absent. */
  protected async findById(id: string): Promise<TEntity | null> {
    return this.activeRepository.findOne({ where: { id, deletedAt: null } as never });
  }

  /** Returns a non-deleted record by id or throws when it is absent. */
  protected async findByIdOrThrow(id: string, message: string): Promise<TEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: message, message: { key: 'core.ERRORS.NOT_FOUND' } });
    return entity;
  }

  /** Creates a query builder with the global soft-delete predicate. */
  protected createActiveQuery(alias: string): SelectQueryBuilder<TEntity> {
    return this.activeRepository.createQueryBuilder(alias).where(`${alias}.deleted_at IS NULL`);
  }

  /** Locks one active row for update; callers must already be inside SuperadminUnitOfWorkService.run(). */
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

  /** Soft-deletes a record without issuing a physical DELETE statement. */
  protected async softDeleteById(id: string): Promise<void> {
    await this.activeRepository.update({ id } as never, { deletedAt: new Date() } as never);
  }

  /** Restores a previously soft-deleted record. */
  protected async restoreById(id: string): Promise<TEntity> {
    await this.activeRepository.update({ id } as never, { deletedAt: null } as never);
    const entity = await this.activeRepository.findOne({ where: { id } as never });
    if (!entity) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'CORE.RECORD.NOT_FOUND', message: { key: 'core.ERRORS.NOT_FOUND' } });
    return entity;
  }
}