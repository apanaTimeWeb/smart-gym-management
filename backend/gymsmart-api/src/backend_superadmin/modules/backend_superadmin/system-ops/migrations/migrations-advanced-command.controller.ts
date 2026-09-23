// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { MigrationsTriggerDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/dtos/migrations-trigger.dto';
import { MigrationsTriggerService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-trigger.service';

@ApiTags('migrationsadvancedcommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MigrationsAdvancedCommandController {
  constructor(private readonly triggerService: MigrationsTriggerService) {}


  /** Executes POST /superadmin/system-ops/migrations/trigger. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/migrations/trigger' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/migrations/trigger')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async trigger(@Body() body: MigrationsTriggerDto): Promise<unknown> { return await this.triggerService.triggerMigration(body); }

}