// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the invoices feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { InvoicesCreateService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-create.service';
import { InvoicesCreateDto } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/dtos/invoices-create.dto';
import { InvoicesUpdateService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-update.service';
import { InvoicesUpdateDto } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/dtos/invoices-update.dto';
import { InvoicesDeleteService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-delete.service';
import { InvoicesStatusService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-status.service';

@ApiTags('invoices')
@Controller('/superadmin/saas-billing/invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InvoicesCommandController {
  constructor(private readonly createService: InvoicesCreateService, private readonly updateService: InvoicesUpdateService, private readonly deleteService: InvoicesDeleteService, private readonly statusService: InvoicesStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create invoices' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: InvoicesCreateDto): Promise<unknown> { return this.createService.createInvoices(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update invoices' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: InvoicesUpdateDto): Promise<unknown> { return this.updateService.updateInvoices(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove invoices' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteInvoices(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus invoices' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeInvoicesStatus(id, body.status); }

}
