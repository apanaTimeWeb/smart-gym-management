// RESPONSIBILITY: Owns HTTP transport for the analytics-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { AnalyticsCreateService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-create.service';
import { AnalyticsCreateDto } from '@/backend_superadmin/modules/superadmin/analytics/dtos/analytics-create.dto';
import { AnalyticsUpdateService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-update.service';
import { AnalyticsUpdateDto } from '@/backend_superadmin/modules/superadmin/analytics/dtos/analytics-update.dto';
import { AnalyticsDeleteService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-delete.service';
import { AnalyticsResponseDto } from '@/backend_superadmin/modules/superadmin/analytics/responses/analytics-response.dto';

@ApiTags('analytics')
@Controller('/superadmin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AnalyticsCommandController {
  constructor(private readonly createService: AnalyticsCreateService, private readonly updateService: AnalyticsUpdateService, private readonly deleteService: AnalyticsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create analytics' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: AnalyticsResponseDto })
    async create(@Body() body: AnalyticsCreateDto): Promise<AnalyticsResponseDto> { return this.createService.createAnalytics(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update analytics' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: AnalyticsResponseDto })
    async update(@Param('id') id: string, @Body() body: AnalyticsUpdateDto): Promise<AnalyticsResponseDto> { return this.updateService.updateAnalytics(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove analytics' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAnalytics(id); }

}