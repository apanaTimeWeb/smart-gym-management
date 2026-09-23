// RESPONSIBILITY: Owns HTTP transport for the migrations-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { MigrationsStatusDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/dtos/migrations-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { MigrationsCreateService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-create.service';
import { MigrationsCreateDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/dtos/migrations-create.dto';
import { MigrationsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-update.service';
import { MigrationsUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/dtos/migrations-update.dto';
import { MigrationsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-delete.service';
import { MigrationsStatusService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-status.service';

@ApiTags('migrations')
@Controller('/superadmin/system-ops/migrations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MigrationsCommandController {
  constructor(private readonly createService: MigrationsCreateService, private readonly updateService: MigrationsUpdateService, private readonly deleteService: MigrationsDeleteService, private readonly statusService: MigrationsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
    async create(@Body() body: MigrationsCreateDto): Promise<unknown> { return this.createService.createMigrations(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: MigrationsUpdateDto): Promise<unknown> { return this.updateService.updateMigrations(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteMigrations(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus migrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: MigrationsStatusDto): Promise<unknown> { return this.statusService.changeMigrationsStatus(id, body.status); }

}
