export interface IProvisionTenantResult {
  tenantId: string;
  databaseName: string;
  status: 'PROVISIONED' | 'ALREADY_EXISTS';
  migrationsRan: boolean;
  provisionedAt: string;
}

export interface ITenantProvisionRequest {
  tenantId: string;
}
