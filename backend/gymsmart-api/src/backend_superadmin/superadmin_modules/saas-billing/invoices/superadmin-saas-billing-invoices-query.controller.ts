// RESPONSIBILITY: Owns HTTP transport for the invoices-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminSaasBillingInvoicesQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-query.dto';
import { SuperadminSaasBillingInvoicesListService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-list.service';
import { SuperadminSaasBillingInvoicesFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-find.service';
import { SuperadminSaasBillingInvoicesExportService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-export.service';
import { SuperadminSaasBillingInvoicesExportQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-export-query.dto';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('invoices')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingInvoicesQueryController {
  constructor(private readonly listService: SuperadminSaasBillingInvoicesListService, private readonly findService: SuperadminSaasBillingInvoicesFindService, private readonly exportService: SuperadminSaasBillingInvoicesExportService) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a paginated invoices list. */
  // SLA: FAST
  @Get(['api/superadmin/saas-billing/invoices', 'api/superadmin/saas-billing/invoices'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminSaasBillingInvoicesQueryDto): Promise<Awaited<ReturnType<SuperadminSaasBillingInvoicesListService['findInvoicesPage']>>> { return await this.listService.findInvoicesPage(query); }
/**
 * Primary Intent: Executes the export use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns an export resource URI for the selected invoice filters. */
  // SLA: HEAVY
  @Get(['api/superadmin/saas-billing/invoices/export', 'api/superadmin/saas-billing/invoices/export'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'export' })
  /**
   * Primary Intent: Executes the export use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async export(@Query() query: SuperadminSaasBillingInvoicesExportQueryDto): Promise<{ downloadUrl: string }> { return this.exportService.export(query.tenantId, query.status); }
/**
 * Primary Intent: Executes the download use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns an invoice download resource URI. */
  // SLA: FAST
  // SLA: HEAVY
  @Get(['api/superadmin/saas-billing/invoices/:id/download', 'api/superadmin/saas-billing/invoices/:id/download'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'download' })
  /**
   * Primary Intent: Executes the download use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async download(@Param('id') id: string): Promise<{ downloadUrl: string }> { return this.exportService.findDownload(id); }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one invoices record. */
  // SLA: FAST
  @Get(['api/superadmin/saas-billing/invoices/:id', 'api/superadmin/saas-billing/invoices/:id'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<Awaited<ReturnType<SuperadminSaasBillingInvoicesFindService['findInvoicesById']>>> { return await this.findService.findInvoicesById(id); }
}
