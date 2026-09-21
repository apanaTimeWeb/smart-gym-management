// RESPONSIBILITY: Exposes the frozen frontend audit-log route aliases without moving the global-audit business implementation.
// FLOW: HTTP alias -> existing GlobalAudit services -> repository -> canonical response envelope.
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GlobalAuditListService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';

@ApiTags('audit-logs')
@Controller('/superadmin/audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditFrontendContractController {
  constructor(private readonly listService: GlobalAuditListService) {}
  /** Returns the audit log collection through the frontend route alias. */
  @Get()
  async list(@Query() query: Record<string, unknown>): Promise<{ data: GlobalAuditResponseDto[]; meta: any }> { return (this.listService.findGlobalAuditPage(query as never)) as any; }
}
