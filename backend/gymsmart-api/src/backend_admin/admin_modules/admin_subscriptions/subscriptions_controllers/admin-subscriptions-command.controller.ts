// RESPONSIBILITY: Exposes mutation endpoints for Admin subscriptions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminSubscriptionsCommandController -> AdminSubscriptionsCommandService.
import { Body, Controller, Delete, HttpStatus, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminSubscriptionsOrchestratorService } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_services/admin-subscriptions-orchestrator.service'

@ApiTags('Admin / subscriptions')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/subscriptions')
/**
 * @description Defines the AdminSubscriptionsCommandController boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsCommandController {
  constructor(private readonly orchestrator: AdminSubscriptionsOrchestratorService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('upgradePlan')
  @ApiOperation({ summary: 'Execute upgradePlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePlan(@Body(new ParseUUIDPipe()) planId: string): Promise<null> {
    return this.orchestrator.updatePlan(planId);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('toggleAutoRenew')
  @ApiOperation({ summary: 'Execute toggleAutoRenew' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateAutoRenew(): Promise<null> {
    return this.orchestrator.updateAutoRenew();
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('setDefaultPaymentMethod')
  @ApiOperation({ summary: 'Execute setDefaultPaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateDefaultPaymentMethod(@Body(new ParseUUIDPipe()) paymentMethodId: string): Promise<null> {
    return this.orchestrator.updateDefaultPaymentMethod(paymentMethodId);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('removePaymentMethod')
  @ApiOperation({ summary: 'Execute removePaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async deletePaymentMethod(@Body(new ParseUUIDPipe()) paymentMethodId: string): Promise<null> {
    return this.orchestrator.deletePaymentMethod(paymentMethodId);
  }

}
