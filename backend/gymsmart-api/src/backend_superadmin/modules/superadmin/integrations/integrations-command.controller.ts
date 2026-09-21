// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the integrations feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { IntegrationsCreateService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-create.service';
import { IntegrationsCreateDto } from '@/backend_superadmin/modules/superadmin/integrations/dtos/integrations-create.dto';
import { IntegrationsUpdateService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-update.service';
import { IntegrationsUpdateDto } from '@/backend_superadmin/modules/superadmin/integrations/dtos/integrations-update.dto';
import { IntegrationsDeleteService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-delete.service';
import { IntegrationsStatusService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-status.service';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';
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
