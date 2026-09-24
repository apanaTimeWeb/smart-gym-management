// RESPONSIBILITY: Resolves authorized tenant DataSources with a global pool budget and in-use lease tracking.
// FLOW: actor + tenant -> authorization -> bounded cache -> lease count -> DataSource.
import { Injectable, OnModuleDestroy, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { SuperadminCoreTenantAuthorizationService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-authorization.service';

/**
 * Primary Intent: Defines the TenantConnectionEntry type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface TenantConnectionEntry { dataSource: DataSource; activeLeases: number; }

/**
 * Primary Intent: Defines SuperadminCoreTenantDatasourceResolverService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreTenantDatasourceResolverService implements OnModuleDestroy {
  private readonly dataSources = new Map<string, TenantConnectionEntry>();
  private readonly leaseWaiters = new Map<string, Array<() => void>>();
  private poolMutationTail: Promise<void> = Promise.resolve();

  constructor(private readonly config: ConfigService, private readonly authorization: SuperadminCoreTenantAuthorizationService) {}

  /**
 * Primary Intent: Executes the `resolve` responsibility owned by this feature-local superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the resolve use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async resolve(actorId: string, tenantId: string): Promise<DataSource> {
    await this.authorization.authorize(actorId, tenantId);
    return this.withPoolMutationLock(async () => {
      const cached = this.dataSources.get(tenantId);
      if (cached) { cached.activeLeases += 1; this.promote(tenantId, cached); return cached.dataSource; }
      await this.evictIfNecessary();
      const dataSource = await this.createTenantDataSource(tenantId);
      this.dataSources.set(tenantId, { dataSource, activeLeases: 1 });
      return dataSource;
    });
  }

  /**
 * Primary Intent: Executes the `releaseRequest` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the releaseRequest use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async releaseRequest(tenantId: string): Promise<void> {
    const entry = this.dataSources.get(tenantId);
    if (!entry) return;
    entry.activeLeases = Math.max(0, entry.activeLeases - 1);
    if (entry.activeLeases === 0) this.resolveIdleWaiters(tenantId);
  }

  /**
 * Primary Intent: Executes the `waitForIdle` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the waitForIdle use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async waitForIdle(tenantId: string, timeoutMs = 30000): Promise<void> {
    const entry = this.dataSources.get(tenantId);
    if (!entry || entry.activeLeases === 0) return;
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const finish = () => { if (settled) return; settled = true; clearTimeout(timer); resolve(); };
      const timer = setTimeout(() => { if (settled) return; settled = true; reject(new ServiceUnavailableException({ error: 'SERVICE_UNAVAILABLE', errorCode: 'TENANT.DATASOURCE.IDLE_TIMEOUT', message: { key: 'auth.ERRORS.UNAUTHORIZED' } })); }, timeoutMs);
      const waiters = this.leaseWaiters.get(tenantId) ?? [];
      waiters.push(finish);
      this.leaseWaiters.set(tenantId, waiters);
    });
  }

  /**
 * Primary Intent: Executes the `withPoolMutationLock` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the withPoolMutationLock use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async withPoolMutationLock<T>(operation: () => Promise<T>): Promise<T> {
    const previous = this.poolMutationTail;
    let release!: () => void;
    this.poolMutationTail = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    try { return await operation(); } finally { release(); }
  }

  /**
 * Primary Intent: Executes the `promote` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the promote use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private promote(tenantId: string, entry: TenantConnectionEntry): void { this.dataSources.delete(tenantId); this.dataSources.set(tenantId, entry); }

  /**
 * Primary Intent: Executes the `createTenantDataSource` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the createTenantDataSource use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async createTenantDataSource(tenantId: string): Promise<DataSource> {
    const baseUrl = new URL(this.config.getOrThrow<string>('app.databaseUrl'));
    const safeTenantId = tenantId.replace(/[^a-zA-Z0-9_]/g, '_');
    baseUrl.pathname = `/${this.config.getOrThrow<string>('app.tenantDatabasePrefix')}${safeTenantId}`;
    const dataSource = new DataSource({ type: 'postgres', url: baseUrl.toString(), synchronize: false, migrationsRun: false, entities: [join(__dirname, '../../superadmin_modules/**/*.entity.{js,ts}')], extra: this.poolOptions() });
    await dataSource.initialize();
    return dataSource;
  }

  /**
 * Primary Intent: Executes the `poolOptions` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the poolOptions use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private poolOptions(): Record<string, number> { return { max: this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase'), connectionTimeoutMillis: this.config.getOrThrow<number>('app.databaseAcquireTimeoutMs'), idleTimeoutMillis: this.config.getOrThrow<number>('app.databaseIdleTimeoutMs'), statement_timeout: this.config.getOrThrow<number>('app.databaseStatementTimeoutMs') }; }

  /**
 * Primary Intent: Executes the `evictIfNecessary` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the evictIfNecessary use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async evictIfNecessary(): Promise<void> {
    const totalPerTenant = this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase');
    const budget = this.config.getOrThrow<number>('app.tenantPoolBudget');
    const maxDataSources = Math.max(1, Math.floor(budget / totalPerTenant));
    while (this.dataSources.size >= maxDataSources) {
      const evicted = await this.evictOldestIdle();
      if (!evicted) throw new ServiceUnavailableException({ error: 'SERVICE_UNAVAILABLE', errorCode: 'TENANT.DATASOURCE.BUDGET_EXHAUSTED', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    }
  }

  /**
 * Primary Intent: Executes the `evictOldestIdle` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the evictOldestIdle use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async evictOldestIdle(): Promise<boolean> {
    for (const [tenantId, entry] of this.dataSources.entries()) {
      if (entry.activeLeases > 0) continue;
      this.dataSources.delete(tenantId);
      if (entry.dataSource.isInitialized) await entry.dataSource.destroy();
      return true;
    }
    return false;
  }

  /**
 * Primary Intent: Executes the `release` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the release use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async release(tenantId: string): Promise<void> {
    await this.waitForIdle(tenantId);
    const entry = this.dataSources.get(tenantId);
    if (!entry) return;
    this.dataSources.delete(tenantId);
    if (entry.dataSource.isInitialized) await entry.dataSource.destroy();
  }

  /**
   * @description Releases queued acquisition waiters for a tenant when a DataSource becomes idle.
   * @param tenantId - Tenant whose queued waiters should be resumed.
   * @returns No return value.
   */
  /**
   * Primary Intent: Executes the `resolveIdleWaiters` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the resolveIdleWaiters use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private resolveIdleWaiters(tenantId: string): void {
    const waiters = this.leaseWaiters.get(tenantId) ?? [];
    this.leaseWaiters.delete(tenantId);
    for (const resolve of waiters) resolve();
  }

  /**
 * Primary Intent: Executes the `onModuleDestroy` responsibility owned by this superadmin-core-tenant-datasource-resolver.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async onModuleDestroy(): Promise<void> {
    await Promise.all([...this.dataSources.values()].filter((entry) => entry.dataSource.isInitialized).map((entry) => entry.dataSource.destroy()));
    this.dataSources.clear();
  }
}
