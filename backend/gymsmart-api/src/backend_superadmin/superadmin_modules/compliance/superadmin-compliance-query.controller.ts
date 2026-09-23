// RESPONSIBILITY: Owns HTTP transport for the compliance-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminComplianceQueryDto } from '@/backend_superadmin/superadmin_modules/compliance/dtos/superadmin-compliance-query.dto';
import { SuperadminComplianceListService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-list.service';
import { SuperadminComplianceFindService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-find.service';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';

@ApiTags('compliance')
@Controller('/superadmin/compliance')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminComplianceQueryController {
  constructor(private readonly listService: SuperadminComplianceListService, private readonly findService: SuperadminComplianceFindService) {}
  /** Returns one compliance record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminComplianceResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminComplianceResponseDto> { return await this.findService.findComplianceById(id); }
}