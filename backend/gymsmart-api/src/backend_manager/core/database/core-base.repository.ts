// RESPONSIBILITY: Shared TypeORM repository infrastructure for active-row scope and transaction binding.
// FLOW: Feature repository -> CoreBaseRepository -> trusted tenant repository -> TypeORM.
import { EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import type { CoreTransactionContext } from '@/core/database/core-unit-of-work.service';
import { CoreTenantDatasourceService } from '@/core/database/core-tenant-datasource.service';

export abstract class CoreBaseRepository<T extends CoreBaseEntity> {
  protected constructor(protected readonly tenants: CoreTenantDatasourceService, protected readonly entityTarget: EntityTarget<T>) {}

  /** @description Resolves a repository from the trusted tenant datasource or active transaction. @param context - Optional transaction context. @returns TypeORM repository. */
  protected async getRepository(context?: CoreTransactionContext): Promise<Repository<T>> { return context?.getRepository(this.entityTarget) ?? this.tenants.getRepository(this.entityTarget); }

  /** @description Builds the global active-row query scope. @param alias - SQL alias. @param context - Optional transaction context. @returns Query builder restricted to non-deleted rows. */
  protected async createActiveQueryBuilder(alias: string, context?: CoreTransactionContext): Promise<SelectQueryBuilder<T>> { return (await this.getRepository(context)).createQueryBuilder(alias).where(`${alias}.deleted_at IS NULL`); }
}
