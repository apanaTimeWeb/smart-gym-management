// RESPONSIBILITY: Resolves authorized tenant DataSources with bounded cache capacity, concurrent initialization deduplication, and in-use eviction protection.
// FLOW: Trusted tenant context -> tenant metadata -> one cached DataSource -> feature repository -> release lease.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreTenantEntityRegistry } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-entity-registry.js';
import { AdminCoreMasterTenantLookupService } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-lookup.service.js';

const POOL_BUDGET_ERROR = 'TENANT.DATASOURCE.POOL_BUDGET_EXHAUSTED';

const tenantDbDir = __dirname;
type CachedSource = { source: DataSource; createdAt: number; lastUsedAt: number; activeLeases: number };

@Injectable()
/**
 * @description Defines the AdminCoreTenantDataSourceManager boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreTenantDataSourceManager implements OnModuleDestroy {
  private readonly sources = new Map<string, CachedSource>();
  private readonly initialization = new Map<string, Promise<DataSource>>();
  private initializingReservations = 0;

  constructor(
    private readonly requestContext: AdminCoreRequestContextService,
    private readonly tenantLookup: AdminCoreMasterTenantLookupService,
    private readonly config: ConfigService,
  ) {}

  /** @description Returns the DataSource for the current trusted tenant and acquires one request/job lease. @returns Initialized tenant DataSource. */
  async getCurrent(): Promise<DataSource> {
    const tenantId = this.requestContext.get().tenantId;
    const source = await this.getForTenant(tenantId);
    const current = this.sources.get(tenantId);
    if (current && !this.requestContext.get().tenantDataSourceLeaseHeld) {
      current.activeLeases += 1;
      current.lastUsedAt = Date.now();
      this.requestContext.setTenantDataSourceLeaseHeld(true);
    }
    return source;
  }

  /** @description Releases the current request/job tenant DataSource lease. @returns Void. */
  releaseCurrent(): void {
    const context = this.requestContext.get();
    if (!context.tenantDataSourceLeaseHeld) return;
    const cached = this.sources.get(context.tenantId);
    if (cached) { cached.activeLeases = Math.max(0, cached.activeLeases - 1); cached.lastUsedAt = Date.now(); }
    context.tenantDataSourceLeaseHeld = false;
  }

  /** @description Resolves a repository using the current transaction manager when one exists, otherwise the cached tenant DataSource. @param target Entity target. @returns Tenant repository. */
  async getCurrentRepository<TEntity extends ObjectLiteral>(target: EntityTarget<TEntity>): Promise<Repository<TEntity>> {
    const manager = this.requestContext.get().entityManager;
    if (manager) return manager.getRepository(target);
    return (await this.getCurrent()).getRepository(target);
  }

  /** @description Resolves one tenant DataSource while deduplicating cold-start initialization. @param tenantId Authorized tenant UUID. @returns Initialized tenant DataSource. */
  async getForTenant(tenantId: string): Promise<DataSource> {
    const cached = this.sources.get(tenantId);
    if (cached?.source.isInitialized) { cached.lastUsedAt = Date.now(); return cached.source; }
    const inFlight = this.initialization.get(tenantId);
    if (inFlight) return inFlight;
    this.initializingReservations += 1;
    const promise = this.initializeTenant(tenantId);
    this.initialization.set(tenantId, promise);
    try { return await promise; } finally { this.initialization.delete(tenantId); this.initializingReservations = Math.max(0, this.initializingReservations - 1); }
  }

  /** @description Initializes a tenant DataSource after safe idle eviction. @param tenantId Authorized tenant UUID. @returns Initialized source. */
  private async initializeTenant(tenantId: string): Promise<DataSource> {
    const databaseName = await this.tenantLookup.findTenantDatabaseNameOrThrow(tenantId);
    const configuredMax = Math.max(1, Number(this.config.get<number>('runtime.tenantPoolMax', 5)));
    const poolBudget = Math.max(configuredMax, Number(this.config.get<number>('runtime.tenantPoolBudget', 20)));
    const maxActiveSources = Math.max(1, Math.floor(poolBudget / configuredMax));
    await this.ensureCapacity(maxActiveSources);
    const dataSource = new DataSource({
      type: 'postgres',
      host: this.config.getOrThrow<string>('runtime.tenantHost'),
      port: this.config.get<number>('runtime.tenantPort', 5432),
      username: this.config.getOrThrow<string>('runtime.tenantUser'),
      password: this.config.getOrThrow<string>('runtime.tenantPassword'),
      database: databaseName,
      entities: AdminCoreTenantEntityRegistry,
      migrations: [join(tenantDbDir, 'admin_core_migrations/admin_core_tenant/*.{js,ts}')],
      migrationsRun: true,
      synchronize: this.config.get<string>('app.nodeEnv', 'development') !== 'production',
      extra: { max: configuredMax, connectionTimeoutMillis: 30000, idleTimeoutMillis: 10000, statement_timeout: 3000 },
    });
    await dataSource.initialize();
    const now = Date.now();
    this.sources.set(tenantId, { source: dataSource, createdAt: now, lastUsedAt: now, activeLeases: 0 });
    return dataSource;
  }

  /** @description Captures the pre-mutation state for the current request so the audit service can persist oldValue without leaking ORM entities into business services. @param value Entity state before mutation. @returns void. */
  captureMutationBefore(value: unknown): void {
    this.requestContext.setMutationBefore(value);
  }

  /** @description Waits briefly for an in-use source to become idle before failing instead of destroying active work. @param maxActiveSources Maximum concurrent cached DataSources. @returns Promise completion. */
  private async ensureCapacity(maxActiveSources: number): Promise<void> {
    const deadline = Date.now() + 5000;
    while (this.sources.size + Math.max(0, this.initializingReservations - 1) >= maxActiveSources) {
      if (await this.evictLeastRecentlyUsedIdle()) return;
      if (Date.now() >= deadline) throw new Error(POOL_BUDGET_ERROR);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }

  /** @description Evicts the least-recently-used idle source only; active leases are never destroyed. @returns True when an idle source was evicted. */
  private async evictLeastRecentlyUsedIdle(): Promise<boolean> {
    const candidate = Array.from(this.sources.entries()).filter(([, value]) => value.activeLeases === 0).sort((a, b) => a[1].lastUsedAt - b[1].lastUsedAt)[0];
    if (!candidate) return false;
    this.sources.delete(candidate[0]);
    if (candidate[1].source.isInitialized) await candidate[1].source.destroy();
    return true;
  }

  async onModuleDestroy(): Promise<void> {
    this.initialization.clear();
    await Promise.all(Array.from(this.sources.values()).filter((entry) => entry.source.isInitialized).map((entry) => entry.source.destroy()));
  }
}
