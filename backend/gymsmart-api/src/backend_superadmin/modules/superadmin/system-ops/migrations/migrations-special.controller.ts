// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the migrations feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { MigrationsTriggerService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-trigger.service';

@ApiTags('migrations-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MigrationsSpecialController {
  constructor(private readonly triggerService: MigrationsTriggerService) {}

  /** Executes POST /superadmin/system-ops/migrations/trigger. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/migrations/trigger' })
  @Post('superadmin/system-ops/migrations/trigger')
  async trigger(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.triggerService.triggerMigration(body); }

}
