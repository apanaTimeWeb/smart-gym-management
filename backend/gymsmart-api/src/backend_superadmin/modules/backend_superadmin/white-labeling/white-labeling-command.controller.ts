// RESPONSIBILITY: Owns HTTP transport for the white-labeling-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { WhiteLabelingStatusDto } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/dtos/white-labeling-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { WhiteLabelingCreateService } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/services/white-labeling-create.service';
import { WhiteLabelingCreateDto } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/dtos/white-labeling-create.dto';
import { WhiteLabelingUpdateService } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/services/white-labeling-update.service';
import { WhiteLabelingUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/dtos/white-labeling-update.dto';
import { WhiteLabelingDeleteService } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/services/white-labeling-delete.service';
import { WhiteLabelingStatusService } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/services/white-labeling-status.service';

@ApiTags('white-labeling')
@Controller('/superadmin/white-labeling')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingCommandController {
  constructor(private readonly createService: WhiteLabelingCreateService, private readonly updateService: WhiteLabelingUpdateService, private readonly deleteService: WhiteLabelingDeleteService, private readonly statusService: WhiteLabelingStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
    async create(@Body() body: WhiteLabelingCreateDto): Promise<unknown> { return this.createService.createWhiteLabeling(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: WhiteLabelingUpdateDto): Promise<unknown> { return this.updateService.updateWhiteLabeling(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteWhiteLabeling(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus white-labeling' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: WhiteLabelingStatusDto): Promise<unknown> { return this.statusService.changeWhiteLabelingStatus(id, body.status); }

}
