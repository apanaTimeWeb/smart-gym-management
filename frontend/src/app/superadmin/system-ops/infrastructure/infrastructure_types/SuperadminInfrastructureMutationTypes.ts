// RESPONSIBILITY: Defines named mutation input contracts for Infrastructure cache actions.
export interface SuperadminInfrastructureTenantFlushInput {
  tenantIds: string[];
  idempotencyKey: string;
}
