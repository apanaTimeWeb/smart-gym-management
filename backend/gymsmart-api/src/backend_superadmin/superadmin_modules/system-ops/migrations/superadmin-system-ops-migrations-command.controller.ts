// RESPONSIBILITY: Owns HTTP transport for the migrations-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminMigrationsStatusDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminMigrationsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-create.service';
import { SuperadminMigrationsCreateDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-create.dto';
import { SuperadminMigrationsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-update.service';
import { SuperadminMigrationsUpdateDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-update.dto';
import { SuperadminMigrationsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-delete.service';
import { SuperadminMigrationsStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-status.service';

@ApiTags('migrations')
@Controller('/superadmin/system-ops/migrations')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMigrationsCommandController {
  constructor(private readonly createService: SuperadminMigrationsCreateService, private readonly updateService: SuperadminMigrationsUpdateService, private readonly deleteService: SuperadminMigrationsDeleteService, private readonly statusService: SuperadminMigrationsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminMigrationsCreateDto): Promise<unknown> { return this.createService.createMigrations(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminMigrationsUpdateDto): Promise<unknown> { return this.updateService.updateMigrations(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteMigrations(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminMigrationsStatusDto): Promise<unknown> { return this.statusService.changeMigrationsStatus(id, body.status); }

}
