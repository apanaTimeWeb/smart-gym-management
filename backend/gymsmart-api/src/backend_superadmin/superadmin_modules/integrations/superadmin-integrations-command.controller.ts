// RESPONSIBILITY: Owns HTTP transport for the integrations-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminIntegrationsGenerateKeyDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-generate-key.dto';
import { SuperadminIntegrationsCreateService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-create.service';
import { SuperadminIntegrationsCreateDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-create.dto';
import { SuperadminIntegrationsUpdateService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-update.service';
import { SuperadminIntegrationsUpdateDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-update.dto';
import { SuperadminIntegrationsDeleteService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-delete.service';
import { SuperadminIntegrationsStatusService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-status.service';
import { SuperadminIntegrationsStatusDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-status.dto';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';

@ApiTags('integrations')
@Controller('/superadmin/integrations')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminIntegrationsCommandController {
  constructor(private readonly createService: SuperadminIntegrationsCreateService, private readonly updateService: SuperadminIntegrationsUpdateService, private readonly deleteService: SuperadminIntegrationsDeleteService, private readonly statusService: SuperadminIntegrationsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
    async create(@Body() body: SuperadminIntegrationsCreateDto): Promise<SuperadminIntegrationsResponseDto> { return (this.createService.createIntegrations(body)) as unknown as SuperadminIntegrationsResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminIntegrationsUpdateDto): Promise<SuperadminIntegrationsResponseDto> { return (this.updateService.updateIntegrations(id, body)) as unknown as SuperadminIntegrationsResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteIntegrations(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminIntegrationsStatusDto): Promise<SuperadminIntegrationsResponseDto> { return (this.statusService.changeIntegrationsStatus(id, body.status)) as unknown as SuperadminIntegrationsResponseDto; }

}