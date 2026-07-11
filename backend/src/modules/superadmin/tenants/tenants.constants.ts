export const TENANT_MESSAGES = {
  PROVISIONED_SUCCESS: 'Tenant database provisioned successfully',
  PROVISION_STARTED: 'Tenant provisioning job started',
  ALREADY_PROVISIONED: 'Tenant database already exists; migrations were re-run',
};

export const TENANT_ERRORS = {
  PROVISION_FAILED: 'Failed to provision tenant database',
  MIGRATION_FAILED: 'Database migrations failed for the new tenant',
  DATABASE_URL_MISSING: 'DATABASE_URL environment variable is not configured',
};
