// RESPONSIBILITY: Exposes mutation endpoints for Admin subscriptions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminSubscriptionsCommandController -> AdminSubscriptionsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminSubscriptionsCommandService } from '@/modules/admin/subscriptions/services/admin-subscriptions-command.service';
import { AdminSubscriptionsMutationDto } from '@/modules/admin/subscriptions/dtos/admin-subscriptions-mutation.dto';
import { AdminSubscriptionsIdDto } from '@/modules/admin/subscriptions/dtos/admin-subscriptions-id.dto';

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
  async upgradePlan(@Body() body: unknown, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.upgradePlan(typeof body === 'string' ? body : String((body as Record<string, unknown>).planId ?? '')));
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
  async setDefaultPaymentMethod(@Body() body: unknown, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.setDefaultPaymentMethod(typeof body === 'string' ? body : String((body as Record<string, unknown>).paymentMethodId ?? '')));
  }

  // SLA: STANDARD
  @Delete('removePaymentMethod')
  @ApiOperation({ summary: 'Execute removePaymentMethod' })
  @ApiResponse({ status: HttpStatus.OK })
  async removePaymentMethod(@Body() body: unknown, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.removePaymentMethod(typeof body === 'string' ? body : String((body as Record<string, unknown>).paymentMethodId ?? '')));
  }

}
