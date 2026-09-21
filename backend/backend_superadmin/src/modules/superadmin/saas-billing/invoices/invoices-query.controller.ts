// RESPONSIBILITY: Owns GET endpoints for the invoices feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { InvoicesQueryDto } from '@/modules/superadmin/saas-billing/invoices/dtos/invoices-query.dto';
import { InvoicesListService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-list.service';
import { InvoicesFindService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-find.service';

@ApiTags('invoices')
@Controller('/superadmin/saas-billing/invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InvoicesQueryController {
  constructor(private readonly listService: InvoicesListService, private readonly findService: InvoicesFindService) {}
  /** Returns a paginated invoices list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: InvoicesQueryDto): Promise<unknown> { return await this.listService.findInvoicesPage(query); }
  /** Returns one invoices record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findInvoicesById(id); }
}
