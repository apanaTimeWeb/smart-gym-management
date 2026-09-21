// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the migrations feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { MigrationsTriggerService } from '@/modules/superadmin/system-ops/migrations/services/migrations-trigger.service';

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
