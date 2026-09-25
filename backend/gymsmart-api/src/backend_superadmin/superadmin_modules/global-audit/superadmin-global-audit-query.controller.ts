// RESPONSIBILITY: Owns HTTP transport for the global-audit-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminGlobalAuditQueryDto } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_dtos/superadmin-global-audit-query.dto';
import { SuperadminGlobalAuditListService } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_services/superadmin-global-audit-list.service';
import { SuperadminGlobalAuditFindService } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_services/superadmin-global-audit-find.service';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_responses/superadmin-global-audit-response.dto';

/**
 * Primary Intent: Defines SuperadminGlobalAuditQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('global-audit')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGlobalAuditQueryController {
  constructor(private readonly listService: SuperadminGlobalAuditListService, private readonly findService: SuperadminGlobalAuditFindService) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a paginated global-audit list. */
  // SLA: FAST
  @Get(['superadmin/global-audit', 'api/superadmin/global-audit'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated global-audit results.' })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminGlobalAuditQueryDto): Promise<{ data: SuperadminGlobalAuditResponseDto[]; meta: unknown }> { return (await this.listService.findGlobalAuditPage(query)) as never; }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one global-audit record. */
  // SLA: FAST
  @Get(['superadmin/global-audit/:id', 'api/superadmin/global-audit/:id'])
  @ApiResponse({ type: SuperadminGlobalAuditResponseDto })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminGlobalAuditResponseDto> {
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!UUID_RE.test(id)) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'GLOBAL_AUDIT.NOT_FOUND', message: { key: 'global_audit.ERRORS.NOT_FOUND' } });
    return (await this.findService.findGlobalAuditById(id)) as unknown as SuperadminGlobalAuditResponseDto;
  }
}
