// RESPONSIBILITY: Owns backend core persistence/query boundary.
// FLOW: Trusted domain input → tenant-scoped query/mutation → ORM entity → mapper → domain result.
import { EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';

export abstract class CoreBaseRepository<T extends CoreBaseEntity> {
  protected constructor(protected readonly tenants: CoreTenantDatasourceService, protected readonly entityTarget: EntityTarget<T>) {}

  /** @description Resolves a repository from the trusted tenant datasource or active transaction. @param context - Optional transaction context. @returns TypeORM repository. */
  protected async getRepository(context?: CoreTransactionContext): Promise<Repository<T>> { return context?.getRepository(this.entityTarget) ?? this.tenants.getRepository(this.entityTarget); }

  /** @description Builds the global active-row query scope. @param alias - SQL alias. @param context - Optional transaction context. @returns Query builder restricted to non-deleted rows. */
  protected async createActiveQueryBuilder(alias: string, context?: CoreTransactionContext): Promise<SelectQueryBuilder<T>> { return (await this.getRepository(context)).createQueryBuilder(alias).where(`${alias}.deleted_at IS NULL`); }
}
