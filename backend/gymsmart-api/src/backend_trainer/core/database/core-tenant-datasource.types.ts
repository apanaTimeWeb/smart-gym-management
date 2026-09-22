// RESPONSIBILITY: Defines the tenant DataSource cache type without exposing mutable infrastructure through modules.
// FLOW: Tenant ID → DataSource cache.


import type { DataSource } from 'typeorm'; export type CoreTenantDataSourceRegistry = Map<string, DataSource>;
