// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the integrations feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { IntegrationsCreateService } from '@/modules/superadmin/integrations/services/integrations-create.service';
import { IntegrationsCreateDto } from '@/modules/superadmin/integrations/dtos/integrations-create.dto';
import { IntegrationsUpdateService } from '@/modules/superadmin/integrations/services/integrations-update.service';
import { IntegrationsUpdateDto } from '@/modules/superadmin/integrations/dtos/integrations-update.dto';
import { IntegrationsDeleteService } from '@/modules/superadmin/integrations/services/integrations-delete.service';
import { IntegrationsStatusService } from '@/modules/superadmin/integrations/services/integrations-status.service';
import { IntegrationsResponseDto } from '@/modules/superadmin/integrations/responses/integrations-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('integrations')
@Controller('/superadmin/integrations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsCommandController {
  constructor(private readonly createService: IntegrationsCreateService, private readonly updateService: IntegrationsUpdateService, private readonly deleteService: IntegrationsDeleteService, private readonly statusService: IntegrationsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create integrations' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: IntegrationsResponseDto })
    async create(@Body() body: IntegrationsCreateDto): Promise<IntegrationsResponseDto> { return (this.createService.createIntegrations(body)) as unknown as IntegrationsResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update integrations' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: IntegrationsResponseDto })
    async update(@Param('id') id: string, @Body() body: IntegrationsUpdateDto): Promise<IntegrationsResponseDto> { return (this.updateService.updateIntegrations(id, body)) as unknown as IntegrationsResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove integrations' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteIntegrations(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus integrations' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: IntegrationsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<IntegrationsResponseDto> { return (this.statusService.changeIntegrationsStatus(id, body.status)) as unknown as IntegrationsResponseDto; }

}
