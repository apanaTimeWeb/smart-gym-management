// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the analytics feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { AnalyticsCreateService } from '@/modules/superadmin/analytics/services/analytics-create.service';
import { AnalyticsCreateDto } from '@/modules/superadmin/analytics/dtos/analytics-create.dto';
import { AnalyticsUpdateService } from '@/modules/superadmin/analytics/services/analytics-update.service';
import { AnalyticsUpdateDto } from '@/modules/superadmin/analytics/dtos/analytics-update.dto';
import { AnalyticsDeleteService } from '@/modules/superadmin/analytics/services/analytics-delete.service';

@ApiTags('analytics')
@Controller('/superadmin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AnalyticsCommandController {
  constructor(private readonly createService: AnalyticsCreateService, private readonly updateService: AnalyticsUpdateService, private readonly deleteService: AnalyticsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create analytics' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    async create(@Body() body: AnalyticsCreateDto): Promise<unknown> { return this.createService.createAnalytics(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update analytics' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: AnalyticsUpdateDto): Promise<unknown> { return this.updateService.updateAnalytics(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove analytics' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAnalytics(id); }

}
