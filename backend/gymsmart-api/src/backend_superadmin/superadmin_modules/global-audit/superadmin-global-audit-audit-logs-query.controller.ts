// RESPONSIBILITY: Owns the audit-log query alias used by the Superadmin frontend; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminGlobalAuditListService } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_services/superadmin-global-audit-list.service';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_responses/superadmin-global-audit-response.dto';
import { SuperadminGlobalAuditQueryDto } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_dtos/superadmin-global-audit-query.dto';

/**
 * Primary Intent: Defines SuperadminGlobalAuditAuditLogsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('audit-logs')
@Controller('/superadmin/audit-logs')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGlobalAuditAuditLogsQueryController {
  constructor(private readonly listService: SuperadminGlobalAuditListService) {}
/**
 * Primary Intent: Executes the list use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the audit log collection through the frontend route alias. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'list' })
  /**
   * Primary Intent: Executes the list use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async list(@Query() query: SuperadminGlobalAuditQueryDto): Promise<{ data: SuperadminGlobalAuditResponseDto[]; meta: unknown }> { return (this.listService.findGlobalAuditPage(query)) as never; }
}
