// RESPONSIBILITY: Owns backend core business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { ForbiddenException, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { MasterTenantEntity } from '@/backend_manager/core/tenant/master-tenant.entity';
import { MasterUserTenantEntity } from '@/backend_manager/core/tenant/master-user-tenant.entity';

@Injectable()
export class CoreTenantAuthorizationService {
  constructor(private readonly master:DataSource,private readonly context:CoreRequestContextService) {}
  /** @description Authorizes an actor for a tenant and stores the master-resolved database name. @param tenantId - Client-supplied tenant UUID. @returns Nothing after context update. @throws ForbiddenException when membership/tenant state is invalid. */
  async authorize(tenantId:string):Promise<void> { const actorId=this.context.get().actorId; if(!actorId) throw new ForbiddenException({errorCode:'TENANT.ACTOR.MISSING'}); const membership=await this.master.getRepository(MasterUserTenantEntity).findOne({where:{userId:actorId,tenantId,isActive:true}}); if(!membership) throw new ForbiddenException({errorCode:'TENANT.ACCESS.DENIED'}); const tenant=await this.master.getRepository(MasterTenantEntity).findOne({where:{id:tenantId,isActive:true}}); if(!tenant || tenant.databaseName!==membership.databaseName) throw new ForbiddenException({errorCode:'TENANT.ACCESS.DENIED'}); this.context.setTenant(tenant.id,tenant.databaseName); }
}
