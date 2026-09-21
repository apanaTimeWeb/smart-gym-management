// RESPONSIBILITY: Supplies the infrastructure-level soft-delete and fail-fast repository primitives required by every feature repository.
// FLOW: Feature repository -> BaseRepository -> TypeORM repository -> PostgreSQL.
import { NotFoundException } from '@nestjs/common';
import { EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';
import { TransactionContext } from '@/core/database/transaction-context';

export abstract class BaseRepository<TEntity extends { id: string; deletedAt: Date | null }> {
  protected constructor(protected readonly repository: Repository<TEntity>, protected readonly transactionContext?: TransactionContext) {}

  /** Resolves the ordinary repository or the transaction-scoped repository when a UnitOfWork is active. */
  protected get activeRepository(): Repository<TEntity> {
    const manager = this.transactionContext?.getManager();
    if (!manager) return this.repository;
    return manager.getRepository<TEntity>(this.repository.metadata.target as EntityTarget<TEntity>);
  }

  /** Returns a non-deleted record by id or null when it is absent. */
  protected async findById(id: string): Promise<TEntity | null> {
    return this.activeRepository.findOne({ where: { id, deletedAt: null } as never });
  }

  /** Returns a non-deleted record by id or throws when it is absent. */
  protected async findByIdOrThrow(id: string, message: string): Promise<TEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(message);
    return entity;
  }

  /** Creates a base query with the global soft-delete predicate. */
  protected createActiveQuery(alias: string): SelectQueryBuilder<TEntity> {
    return this.activeRepository.createQueryBuilder(alias).where(`${alias}.deleted_at IS NULL`);
  }

  /** Soft-deletes a record without issuing a hard DELETE. */
  protected async softDeleteById(id: string): Promise<void> { await this.activeRepository.update({ id } as never, { deletedAt: new Date() } as never); }

  /** Restores a previously soft-deleted record without physically recreating it. */
  protected async restoreById(id: string): Promise<TEntity> {
    await this.activeRepository.update({ id } as never, { deletedAt: null } as never);
    const entity = await this.activeRepository.findOne({ where: { id } as never });
    if (!entity) throw new NotFoundException('Record not found');
    return entity;
  }
}
