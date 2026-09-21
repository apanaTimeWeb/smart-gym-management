// RESPONSIBILITY: Owns GET endpoints for the compliance feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { ComplianceQueryDto } from '@/modules/superadmin/compliance/dtos/compliance-query.dto';
import { ComplianceListService } from '@/modules/superadmin/compliance/services/compliance-list.service';
import { ComplianceFindService } from '@/modules/superadmin/compliance/services/compliance-find.service';
import { ComplianceResponseDto } from '@/modules/superadmin/compliance/responses/compliance-response.dto';
import { ApiResponse } from '@nestjs/swagger';

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
