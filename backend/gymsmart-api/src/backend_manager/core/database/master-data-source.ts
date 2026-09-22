// RESPONSIBILITY: TypeORM CLI DataSource for master PostgreSQL migrations; tooling-only.
// FLOW: CLI environment -> schema validation -> master DataSource -> migrations.
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { CoreEnvSchema } from '@/backend_manager/core/config/core-env.schema';
import { MasterTenantEntity } from '@/backend_manager/core/tenant/master-tenant.entity';
import { MasterUserEntity } from '@/backend_manager/core/tenant/master-user.entity';
import { MasterUserTenantEntity } from '@/backend_manager/core/tenant/master-user-tenant.entity';

const environment=CoreEnvSchema.parse(process.env);
export default new DataSource({type:'postgres',url:environment.MASTER_DATABASE_URL,entities:[MasterTenantEntity,MasterUserEntity,MasterUserTenantEntity],migrations:['src/core/database/migrations/1711000000000-master-schema.ts','src/core/database/migrations/1711000000200-master-hardening.ts'],synchronize:false});
