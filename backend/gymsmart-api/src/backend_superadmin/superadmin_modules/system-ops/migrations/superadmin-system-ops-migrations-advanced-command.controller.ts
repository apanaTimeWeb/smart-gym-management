// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminMigrationsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-trigger.dto';
import { SuperadminMigrationsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-trigger.service';

@ApiTags('migrationsadvancedcommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMigrationsAdvancedCommandController {
  constructor(private readonly triggerService: SuperadminMigrationsTriggerService) {}


  /** Executes POST /superadmin/system-ops/migrations/trigger. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/migrations/trigger' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/migrations/trigger')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async trigger(@Body() body: SuperadminMigrationsTriggerDto): Promise<unknown> { return await this.triggerService.triggerMigration(body); }

}