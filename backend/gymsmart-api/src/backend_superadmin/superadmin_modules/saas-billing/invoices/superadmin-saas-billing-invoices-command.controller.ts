// RESPONSIBILITY: Owns HTTP transport for the invoices-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminInvoicesStatusDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminInvoicesCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-create.service';
import { SuperadminInvoicesCreateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-create.dto';
import { SuperadminInvoicesUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-update.service';
import { SuperadminInvoicesUpdateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-update.dto';
import { SuperadminInvoicesDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-delete.service';
import { SuperadminInvoicesStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-status.service';

@ApiTags('invoices')
@Controller('/superadmin/saas-billing/invoices')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInvoicesCommandController {
  constructor(private readonly createService: SuperadminInvoicesCreateService, private readonly updateService: SuperadminInvoicesUpdateService, private readonly deleteService: SuperadminInvoicesDeleteService, private readonly statusService: SuperadminInvoicesStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create invoices' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminInvoicesCreateDto): Promise<unknown> { return this.createService.createInvoices(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update invoices' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminInvoicesUpdateDto): Promise<unknown> { return this.updateService.updateInvoices(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove invoices' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteInvoices(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus invoices' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminInvoicesStatusDto): Promise<unknown> { return this.statusService.changeInvoicesStatus(id, body.status); }

}
