// RESPONSIBILITY: Exposes read-only Admin subscriptions HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSubscriptionsQueryController -> AdminSubscriptionsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminSubscriptionsQueryService } from '@/modules/admin/subscriptions/services/admin-subscriptions-query.service';
import { AdminSubscriptionsQueryDto } from '@/modules/admin/subscriptions/dtos/admin-subscriptions-query.dto';
import { 
  AdminCurrentSubscriptionDto, 
  AdminSaaSPlanListResponseDto, 
  AdminInvoiceListResponseDto, 
  AdminPaymentMethodListResponseDto, 
  AdminSubscriptionKPIDataDto 
} from '@/modules/admin/subscriptions/dtos/admin-subscriptions-response.dto';

@ApiTags('Admin / subscriptions')
@Controller('admin/subscriptions')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminSubscriptionsQueryController {
  constructor(private readonly service: AdminSubscriptionsQueryService) {}

  // SLA: STANDARD
  @Get('fetchSubscription')
  @ApiOperation({ summary: 'Execute fetchSubscription' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCurrentSubscriptionDto })
  async fetchSubscription(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminCurrentSubscriptionDto> {
    return this.service.fetchSubscription(query) as unknown as AdminCurrentSubscriptionDto;
  }

  // SLA: STANDARD
  @Get('fetchPlans')
  @ApiOperation({ summary: 'Execute fetchPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSaaSPlanListResponseDto })
  async fetchPlans(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminSaaSPlanListResponseDto> {
    return this.service.fetchPlans(query) as unknown as AdminSaaSPlanListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchInvoices')
  @ApiOperation({ summary: 'Execute fetchInvoices' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminInvoiceListResponseDto })
  async fetchInvoices(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminInvoiceListResponseDto> {
    return this.service.fetchInvoices(query) as unknown as AdminInvoiceListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchPaymentMethods')
  @ApiOperation({ summary: 'Execute fetchPaymentMethods' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPaymentMethodListResponseDto })
  async fetchPaymentMethods(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminPaymentMethodListResponseDto> {
    return this.service.fetchPaymentMethods(query) as unknown as AdminPaymentMethodListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSubscriptionKPIDataDto })
  async fetchKPIs(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminSubscriptionKPIDataDto> {
    return this.service.fetchKPIs(query) as unknown as AdminSubscriptionKPIDataDto;
  }

}
