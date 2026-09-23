// RESPONSIBILITY: Owns HTTP transport for the backups-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { BackupsStatusDto } from '@/backend_superadmin/modules/superadmin/system-ops/backups/dtos/backups-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { BackupsCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-create.service';
import { BackupsCreateDto } from '@/backend_superadmin/modules/superadmin/system-ops/backups/dtos/backups-create.dto';
import { BackupsUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-update.service';
import { BackupsUpdateDto } from '@/backend_superadmin/modules/superadmin/system-ops/backups/dtos/backups-update.dto';
import { BackupsDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-delete.service';
import { BackupsStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-status.service';

@ApiTags('backups')
@Controller('/superadmin/system-ops/backups')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BackupsCommandController {
  constructor(private readonly createService: BackupsCreateService, private readonly updateService: BackupsUpdateService, private readonly deleteService: BackupsDeleteService, private readonly statusService: BackupsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create backups' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
    async create(@Body() body: BackupsCreateDto): Promise<unknown> { return this.createService.createBackups(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update backups' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: BackupsUpdateDto): Promise<unknown> { return this.updateService.updateBackups(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove backups' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteBackups(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus backups' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: BackupsStatusDto): Promise<unknown> { return this.statusService.changeBackupsStatus(id, body.status); }

}
