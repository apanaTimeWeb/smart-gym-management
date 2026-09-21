// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the white-labeling feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { WhiteLabelingCreateService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-create.service';
import { WhiteLabelingCreateDto } from '@/backend_superadmin/modules/superadmin/white-labeling/dtos/white-labeling-create.dto';
import { WhiteLabelingUpdateService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-update.service';
import { WhiteLabelingUpdateDto } from '@/backend_superadmin/modules/superadmin/white-labeling/dtos/white-labeling-update.dto';
import { WhiteLabelingDeleteService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-delete.service';
import { WhiteLabelingStatusService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-status.service';

@ApiTags('white-labeling')
@Controller('/superadmin/white-labeling')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingCommandController {
  constructor(private readonly createService: WhiteLabelingCreateService, private readonly updateService: WhiteLabelingUpdateService, private readonly deleteService: WhiteLabelingDeleteService, private readonly statusService: WhiteLabelingStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create white-labeling' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: WhiteLabelingCreateDto): Promise<unknown> { return this.createService.createWhiteLabeling(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update white-labeling' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: WhiteLabelingUpdateDto): Promise<unknown> { return this.updateService.updateWhiteLabeling(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove white-labeling' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteWhiteLabeling(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus white-labeling' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeWhiteLabelingStatus(id, body.status); }

}
