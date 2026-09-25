// RESPONSIBILITY: Exposes the global framework infrastructure boundary to the application composition root.
// FLOW: AppModule -> AdminCoreModule -> AdminCoreInfrastructureModule -> global guards/interceptors/services.
import { Global, Module } from '@nestjs/common';

import { AdminCoreInfrastructureModule } from '@/backend_admin/admin_core/admin-core-infrastructure.module.js';

@Global()
@Module({ imports: [AdminCoreInfrastructureModule] })
/**
 * @description Defines the AdminCoreModule boundary for the admin-core.module.ts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreModule {}
