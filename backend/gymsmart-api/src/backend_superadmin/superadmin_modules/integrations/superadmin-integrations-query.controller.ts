// RESPONSIBILITY: Owns HTTP transport for the integrations-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminIntegrationsQueryDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-query.dto';
import { SuperadminIntegrationsListService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-list.service';
import { SuperadminIntegrationsFindService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-find.service';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';

@ApiTags('integrations')
@Controller('/superadmin/integrations')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminIntegrationsQueryController {
  constructor(private readonly listService: SuperadminIntegrationsListService, private readonly findService: SuperadminIntegrationsFindService) {}
  /** Returns one integrations record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminIntegrationsResponseDto> { return (await this.findService.findIntegrationsById(id)) as unknown as SuperadminIntegrationsResponseDto; }
}