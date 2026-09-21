// RESPONSIBILITY: Owns GET endpoints for the invoices feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { InvoicesQueryDto } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/dtos/invoices-query.dto';
import { InvoicesListService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-list.service';
import { InvoicesFindService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-find.service';
import { InvoicesExportService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-export.service';
import { InvoicesExportQueryDto } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/dtos/invoices-export-query.dto';

@ApiTags('invoices')
@Controller('/superadmin/saas-billing/invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InvoicesQueryController {
  constructor(private readonly listService: InvoicesListService, private readonly findService: InvoicesFindService, private readonly exportService: InvoicesExportService) {}
  /** Returns a paginated invoices list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: InvoicesQueryDto): Promise<unknown> { return await this.listService.findInvoicesPage(query); }
  /** Returns an export resource URI for the selected invoice filters. */
  @Get('export')
  async export(@Query() query: InvoicesExportQueryDto): Promise<{ downloadUrl: string }> { return this.exportService.export(query.tenantId, query.status); }

  /** Returns an invoice download resource URI. */
  @Get(':id/download')
  async download(@Param('id') id: string): Promise<{ downloadUrl: string }> { return this.exportService.findDownload(id); }

  /** Returns one invoices record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findInvoicesById(id); }
}
