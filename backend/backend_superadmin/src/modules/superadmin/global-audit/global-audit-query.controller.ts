// RESPONSIBILITY: Owns GET endpoints for the global-audit feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { GlobalAuditQueryDto } from '@/modules/superadmin/global-audit/dtos/global-audit-query.dto';
import { GlobalAuditListService } from '@/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/modules/superadmin/global-audit/services/global-audit-find.service';

@ApiTags('global-audit')
@Controller('/superadmin/global-audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditQueryController {
  constructor(private readonly listService: GlobalAuditListService, private readonly findService: GlobalAuditFindService) {}
  /** Returns a paginated global-audit list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: GlobalAuditQueryDto): Promise<unknown> { return await this.listService.findGlobalAuditPage(query); }
  /** Returns one global-audit record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findGlobalAuditById(id); }
}
