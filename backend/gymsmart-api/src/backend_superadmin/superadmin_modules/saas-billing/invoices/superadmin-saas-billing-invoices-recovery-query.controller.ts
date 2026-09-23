// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminInvoicesRecoveryCenterService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-recovery-center.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('invoicesrecoveryquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInvoicesRecoveryQueryController {
  constructor(private readonly recoveryCenterService: SuperadminInvoicesRecoveryCenterService) {}


  /** Executes GET /superadmin/saas-billing/invoices/recovery-center. */
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/invoices/recovery-center' })
  // SLA: FAST
  @Get('superadmin/saas-billing/invoices/recovery-center')
  @Get('api/superadmin/saas-billing/invoices/recovery-center')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async recoveryCenter(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.recoveryCenterService.findInvoicesRecoveryCenter({ query }); }

}