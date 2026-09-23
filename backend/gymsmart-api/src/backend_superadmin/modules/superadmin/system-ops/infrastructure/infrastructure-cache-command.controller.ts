// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { InfrastructureFlushTenantDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-flush-tenant.dto';
import { InfrastructureFlushGlobalService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-flush-global.service';
import { InfrastructureFlushTenantService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-flush-tenant.service';

@ApiTags('infrastructurecachecommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InfrastructureCacheCommandController {
  constructor(private readonly flushGlobalService: InfrastructureFlushGlobalService, private readonly flushTenantService: InfrastructureFlushTenantService) {}


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
  async flushTenant(@Body() body: InfrastructureFlushTenantDto): Promise<unknown> { return await this.flushTenantService.flushTenantCache(body.tenantIds); }

}