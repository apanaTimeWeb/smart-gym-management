// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesRecoveryCenterService } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/services/invoices-recovery-center.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('invoicesrecoveryquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InvoicesRecoveryQueryController {
  constructor(private readonly recoveryCenterService: InvoicesRecoveryCenterService) {}


  /** Executes GET /superadmin/saas-billing/invoices/recovery-center. */
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/invoices/recovery-center' })
  // SLA: FAST
  @Get('superadmin/saas-billing/invoices/recovery-center')
  @Get('api/superadmin/saas-billing/invoices/recovery-center')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async recoveryCenter(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.recoveryCenterService.findInvoicesRecoveryCenter({ query }); }

}