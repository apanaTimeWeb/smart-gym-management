// RESPONSIBILITY: Opens and closes tenant PostgreSQL transactions behind the ORM-free UnitOfWork contract.
// FLOW: Orchestrator -> LandingCoreUnitOfWork -> LandingTypeormUnitOfWorkService -> tenant DataSource -> transaction context.
import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { LandingTenantContextService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-context.service';

import type { LandingCoreUnitOfWork } from '@/backend_landing/landing_core/landing_database/landing-transaction-context';

/**
 * Intent: Encapsulate tenant transaction lifecycle behind an application-level UnitOfWork contract so services never receive TypeORM transaction primitives.
 * Edge Cases: Missing tenant context prevents DataSource resolution; callback exceptions cause rollback; the ORM manager remains infrastructure-local.
 * Side Effects: Commits successful tenant work or rolls it back on callback failure.
 * AI Notes: Do not change the public contract to expose EntityManager, QueryRunner, DataSource, or Repository.
 */
@Injectable()
export class LandingTypeormUnitOfWorkService implements LandingCoreUnitOfWork {
  
  /**
   * Intent: Preserve the single responsibility of landing-typeorm-unit-of-work.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly tenantContext: LandingTenantContextService,
    private readonly transactionContext: LandingOrmTransactionContextService,
  ) {}

  /**
   * @description Runs one application mutation inside the trusted tenant DataSource transaction.
   * @param work - Application callback that calls feature services and repository abstractions.
   * @returns The callback result after transaction commit.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-typeorm-unit-of-work.service.runInTransaction at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    const dataSource: DataSource = await this.tenantContext.resolveTenantDataSource();
    return dataSource.transaction((manager) => this.transactionContext.run(manager, work));
  }
}
