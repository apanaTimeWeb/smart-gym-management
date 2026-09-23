// RESPONSIBILITY: Owns HTTP transport for the integrations-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { IntegrationsQueryDto } from '@/backend_superadmin/modules/superadmin/integrations/dtos/integrations-query.dto';
import { IntegrationsListService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-list.service';
import { IntegrationsFindService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-find.service';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';

@ApiTags('integrations')
@Controller('/superadmin/integrations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsQueryController {
  constructor(private readonly listService: IntegrationsListService, private readonly findService: IntegrationsFindService) {}
  /** Returns one integrations record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: IntegrationsResponseDto })
  async findOne(@Param('id') id: string): Promise<IntegrationsResponseDto> { return (await this.findService.findIntegrationsById(id)) as unknown as IntegrationsResponseDto; }
}