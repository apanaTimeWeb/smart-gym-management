// RESPONSIBILITY: Owns backend core module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { ManagerCoreEnvSchema } from '@/backend_manager/manager_core/manager_core_config/manager-core-env.schema';
import { MasterTenantEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-tenant.entity';
import { MasterUserTenantEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-user-tenant.entity';
import { MasterUserEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-user.entity';

const environment=ManagerCoreEnvSchema.parse(process.env);
export default new DataSource({type:'postgres',url:environment.MASTER_DATABASE_URL,entities:[MasterTenantEntity,MasterUserEntity,MasterUserTenantEntity],migrations:['src/core/database/migrations/1711000000000-master-schema.ts','src/core/database/migrations/1711000000200-master-hardening.ts'],synchronize:false});
