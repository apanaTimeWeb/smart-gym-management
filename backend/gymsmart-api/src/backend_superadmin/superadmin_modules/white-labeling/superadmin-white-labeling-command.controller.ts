// RESPONSIBILITY: Owns HTTP transport for the white-labeling-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminWhiteLabelingStatusDto } from '@/backend_superadmin/superadmin_modules/white-labeling/dtos/superadmin-white-labeling-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminWhiteLabelingCreateService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-create.service';
import { SuperadminWhiteLabelingCreateDto } from '@/backend_superadmin/superadmin_modules/white-labeling/dtos/superadmin-white-labeling-create.dto';
import { SuperadminWhiteLabelingUpdateService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-update.service';
import { SuperadminWhiteLabelingUpdateDto } from '@/backend_superadmin/superadmin_modules/white-labeling/dtos/superadmin-white-labeling-update.dto';
import { SuperadminWhiteLabelingDeleteService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-delete.service';
import { SuperadminWhiteLabelingStatusService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-status.service';

@ApiTags('white-labeling')
@Controller('/superadmin/white-labeling')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminWhiteLabelingCommandController {
  constructor(private readonly createService: SuperadminWhiteLabelingCreateService, private readonly updateService: SuperadminWhiteLabelingUpdateService, private readonly deleteService: SuperadminWhiteLabelingDeleteService, private readonly statusService: SuperadminWhiteLabelingStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminWhiteLabelingCreateDto): Promise<unknown> { return this.createService.createWhiteLabeling(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminWhiteLabelingUpdateDto): Promise<unknown> { return this.updateService.updateWhiteLabeling(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteWhiteLabeling(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminWhiteLabelingStatusDto): Promise<unknown> { return this.statusService.changeWhiteLabelingStatus(id, body.status); }

}
