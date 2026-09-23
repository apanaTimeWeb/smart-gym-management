// RESPONSIBILITY: Owns HTTP transport for the compliance-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ComplianceQueryDto } from '@/backend_superadmin/modules/superadmin/compliance/dtos/compliance-query.dto';
import { ComplianceListService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-list.service';
import { ComplianceFindService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-find.service';
import { ComplianceResponseDto } from '@/backend_superadmin/modules/superadmin/compliance/responses/compliance-response.dto';

@ApiTags('compliance')
@Controller('/superadmin/compliance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ComplianceQueryController {
  constructor(private readonly listService: ComplianceListService, private readonly findService: ComplianceFindService) {}
  /** Returns one compliance record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: ComplianceResponseDto })
  async findOne(@Param('id') id: string): Promise<ComplianceResponseDto> { return await this.findService.findComplianceById(id); }
}