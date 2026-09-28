// RESPONSIBILITY: Owns backend core business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { ForbiddenException, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { MasterTenantEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-tenant.entity';
import { MasterUserTenantEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-user-tenant.entity';
import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';

@Injectable()
export class ManagerCoreTenantAuthorizationService {
  constructor(private readonly master:DataSource,private readonly context:ManagerCoreRequestContextService,private readonly config:ManagerCoreConfigService) {}
  /** @description Authorizes an actor for a tenant and stores the master-resolved database name. @param tenantId - Client-supplied tenant UUID. @returns Nothing after context update. @throws ForbiddenException when membership/tenant state is invalid. */
  async authorize(tenantId:string):Promise<void> { const actorId=this.context.get().actorId; if(!actorId) throw new ForbiddenException({errorCode:'TENANT.ACTOR.MISSING'}); const membership=await this.master.getRepository(MasterUserTenantEntity).findOne({where:{userId:actorId,tenantId,isActive:true}}); if(!membership) throw new ForbiddenException({errorCode:'TENANT.ACCESS.DENIED'}); const tenant=await this.master.getRepository(MasterTenantEntity).findOne({where:{id:tenantId,isActive:true}}); if(!tenant || tenant.databaseName!==membership.databaseName || !tenant.databaseName.startsWith(this.config.tenantDbPrefix)) throw new ForbiddenException({errorCode:'TENANT.ACCESS.DENIED'}); this.context.setTenant(tenant.id,tenant.databaseName); }
}
