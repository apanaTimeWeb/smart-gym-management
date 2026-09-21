// RESPONSIBILITY: Exposes mutation endpoints for Admin subscriptions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminSubscriptionsCommandController -> AdminSubscriptionsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminSubscriptionsCommandService } from '@/backend_admin/modules/admin/subscriptions/services/admin-subscriptions-command.service';

@ApiTags('Admin / subscriptions')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/subscriptions')
export class AdminSubscriptionsCommandController {
  constructor(private readonly service: AdminSubscriptionsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('upgradePlan')
  @ApiOperation({ summary: 'Execute upgradePlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async upgradePlan(@Body(new ParseUUIDPipe()) planId: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.upgradePlan(planId)) as Promise<void>;
  }

  // SLA: STANDARD
  @Post('toggleAutoRenew')
  @ApiOperation({ summary: 'Execute toggleAutoRenew' })
  @ApiResponse({ status: HttpStatus.OK })
  async toggleAutoRenew(@Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.toggleAutoRenew()) as Promise<void>;
  }

  // SLA: STANDARD
  @Post('setDefaultPaymentMethod')
  @ApiOperation({ summary: 'Execute setDefaultPaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async setDefaultPaymentMethod(@Body(new ParseUUIDPipe()) paymentMethodId: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.setDefaultPaymentMethod(paymentMethodId)) as Promise<void>;
  }

  // SLA: STANDARD
  @Delete('removePaymentMethod')
  @ApiOperation({ summary: 'Execute removePaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async removePaymentMethod(@Body(new ParseUUIDPipe()) paymentMethodId: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.removePaymentMethod(paymentMethodId)) as Promise<void>;
  }

}
