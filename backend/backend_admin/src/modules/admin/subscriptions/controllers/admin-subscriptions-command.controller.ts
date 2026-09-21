// RESPONSIBILITY: Exposes mutation endpoints for Admin subscriptions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminSubscriptionsCommandController -> AdminSubscriptionsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminSubscriptionsCommandService } from '@/modules/admin/subscriptions/services/admin-subscriptions-command.service';

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
  async upgradePlan(@Body(new ParseUUIDPipe()) planId: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.upgradePlan(planId));
  }

  // SLA: STANDARD
  @Post('toggleAutoRenew')
  @ApiOperation({ summary: 'Execute toggleAutoRenew' })
  @ApiResponse({ status: HttpStatus.OK })
  async toggleAutoRenew(@Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.toggleAutoRenew());
  }

  // SLA: STANDARD
  @Post('setDefaultPaymentMethod')
  @ApiOperation({ summary: 'Execute setDefaultPaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async setDefaultPaymentMethod(@Body(new ParseUUIDPipe()) paymentMethodId: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.setDefaultPaymentMethod(paymentMethodId));
  }

  // SLA: STANDARD
  @Delete('removePaymentMethod')
  @ApiOperation({ summary: 'Execute removePaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async removePaymentMethod(@Body(new ParseUUIDPipe()) paymentMethodId: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.removePaymentMethod(paymentMethodId));
  }

}
