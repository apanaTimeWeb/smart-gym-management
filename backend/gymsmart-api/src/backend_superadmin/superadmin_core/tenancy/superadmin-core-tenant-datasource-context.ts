// RESPONSIBILITY: Holds the authorized tenant DataSource for the current async request without leaking tenancy parameters through business code.
// FLOW: SuperadminJwtAuthGuard -> SuperadminTenantDatasourceResolverService -> AsyncLocalStorage -> BaseRepository.
import { AsyncLocalStorage } from 'node:async_hooks';
import type { DataSource } from 'typeorm';

const tenantDataSourceStorage = new AsyncLocalStorage<DataSource>();

export function enterTenantDataSource(dataSource: DataSource): void {
  tenantDataSourceStorage.enterWith(dataSource);
}

export function getTenantDataSource(): DataSource | undefined {
  return tenantDataSourceStorage.getStore();
}