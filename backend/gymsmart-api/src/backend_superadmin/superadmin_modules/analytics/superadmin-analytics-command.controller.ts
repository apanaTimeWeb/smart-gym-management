// RESPONSIBILITY: Owns HTTP transport for the analytics-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminAnalyticsCreateService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-create.service';
import { SuperadminAnalyticsCreateDto } from '@/backend_superadmin/superadmin_modules/analytics/dtos/superadmin-analytics-create.dto';
import { SuperadminAnalyticsUpdateService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-update.service';
import { SuperadminAnalyticsUpdateDto } from '@/backend_superadmin/superadmin_modules/analytics/dtos/superadmin-analytics-update.dto';
import { SuperadminAnalyticsDeleteService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-delete.service';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';

@ApiTags('analytics')
@Controller('/superadmin/analytics')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAnalyticsCommandController {
  constructor(private readonly createService: SuperadminAnalyticsCreateService, private readonly updateService: SuperadminAnalyticsUpdateService, private readonly deleteService: SuperadminAnalyticsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create analytics' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminAnalyticsResponseDto })
    async create(@Body() body: SuperadminAnalyticsCreateDto): Promise<SuperadminAnalyticsResponseDto> { return this.createService.createAnalytics(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update analytics' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminAnalyticsResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminAnalyticsUpdateDto): Promise<SuperadminAnalyticsResponseDto> { return this.updateService.updateAnalytics(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove analytics' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAnalytics(id); }

}