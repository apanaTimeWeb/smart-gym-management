// RESPONSIBILITY: Owns HTTP transport for the invoices-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminInvoicesQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-query.dto';
import { SuperadminInvoicesListService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-list.service';
import { SuperadminInvoicesFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-find.service';
import { SuperadminInvoicesExportService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-export.service';
import { SuperadminInvoicesExportQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-export-query.dto';

@ApiTags('invoices')
@Controller('/superadmin/saas-billing/invoices')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInvoicesQueryController {
  constructor(private readonly listService: SuperadminInvoicesListService, private readonly findService: SuperadminInvoicesFindService, private readonly exportService: SuperadminInvoicesExportService) {}
  /** Returns a paginated invoices list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminInvoicesQueryDto): Promise<unknown> { return await this.listService.findInvoicesPage(query); }
  /** Returns an export resource URI for the selected invoice filters. */
  // SLA: HEAVY
  @Get('export')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async export(@Query() query: SuperadminInvoicesExportQueryDto): Promise<{ downloadUrl: string }> { return this.exportService.export(query.tenantId, query.status); }

  /** Returns an invoice download resource URI. */
  // SLA: FAST
  @Get(':id/download')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async download(@Param('id') id: string): Promise<{ downloadUrl: string }> { return this.exportService.findDownload(id); }

  /** Returns one invoices record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findInvoicesById(id); }
}