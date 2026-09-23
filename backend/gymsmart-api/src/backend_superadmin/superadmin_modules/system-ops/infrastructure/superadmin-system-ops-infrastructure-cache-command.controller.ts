// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminInfrastructureFlushTenantDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/dtos/superadmin-system-ops-infrastructure-flush-tenant.dto';
import { SuperadminInfrastructureFlushGlobalService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-flush-global.service';
import { SuperadminInfrastructureFlushTenantService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-flush-tenant.service';

@ApiTags('infrastructurecachecommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInfrastructureCacheCommandController {
  constructor(private readonly flushGlobalService: SuperadminInfrastructureFlushGlobalService, private readonly flushTenantService: SuperadminInfrastructureFlushTenantService) {}


  /** Executes POST /superadmin/system-ops/infrastructure/redis/flush-global. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/infrastructure/redis/flush-global' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/system-ops/infrastructure/redis/flush-global')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async flushGlobal(): Promise<unknown> { return await this.flushGlobalService.flushGlobalCache(); }


  /** Executes POST /superadmin/system-ops/infrastructure/redis/flush-tenant. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/infrastructure/redis/flush-tenant' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/system-ops/infrastructure/redis/flush-tenant')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async flushTenant(@Body() body: SuperadminInfrastructureFlushTenantDto): Promise<unknown> { return await this.flushTenantService.flushTenantCache(body.tenantIds); }

}