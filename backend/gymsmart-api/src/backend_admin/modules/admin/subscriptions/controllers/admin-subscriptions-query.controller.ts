// RESPONSIBILITY: Exposes read-only Admin subscriptions HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSubscriptionsQueryController -> AdminSubscriptionsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminSubscriptionsQueryService } from '@/backend_admin/modules/admin/subscriptions/services/admin-subscriptions-query.service';
import { AdminSubscriptionsQueryDto } from '@/backend_admin/modules/admin/subscriptions/dtos/admin-subscriptions-query.dto';
import { 
  AdminCurrentSubscriptionDto, 
  AdminSaaSPlanDto, 
  AdminInvoiceDto, 
  AdminPaymentMethodDto, 
  AdminSubscriptionKPIDataDto 
} from '@/backend_admin/modules/admin/subscriptions/dtos/admin-subscriptions-response.dto';

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
    return this.service.fetchSubscription(query);
  }

  // SLA: STANDARD
  @Get('fetchPlans')
  @ApiOperation({ summary: 'Execute fetchPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminSaaSPlanDto] })
  async fetchPlans(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminSaaSPlanDto[]> {
    return this.service.fetchPlans(query);
  }

  // SLA: STANDARD
  @Get('fetchInvoices')
  @ApiOperation({ summary: 'Execute fetchInvoices' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminInvoiceDto] })
  async fetchInvoices(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminInvoiceDto[]> {
    return this.service.fetchInvoices(query);
  }

  // SLA: STANDARD
  @Get('fetchPaymentMethods')
  @ApiOperation({ summary: 'Execute fetchPaymentMethods' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPaymentMethodDto] })
  async fetchPaymentMethods(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminPaymentMethodDto[]> {
    return this.service.fetchPaymentMethods(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSubscriptionKPIDataDto })
  async fetchKPIs(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminSubscriptionKPIDataDto> {
    return this.service.fetchKPIs(query);
  }

}
