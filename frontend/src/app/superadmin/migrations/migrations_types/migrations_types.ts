import type { Tenant } from '@/app/superadmin/gyms/gyms_types/gyms_types';

export interface SchemaMigration {
  id: string;
  name: string;
  version: string;
  description: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  appliedAt?: string;
}

export interface MigrationsPageData {
  migrations: SchemaMigration[];
  tenants: Tenant[];
}
