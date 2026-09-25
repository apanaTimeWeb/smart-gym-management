// RESPONSIBILITY: Exposes read-only Admin subscriptions HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSubscriptionsQueryController -> AdminSubscriptionsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminSubscriptionsQueryDto } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_dtos/admin-subscriptions-query.dto.js';
import { 
  AdminCurrentSubscriptionDto, 
  AdminSaaSPlanDto, 
  AdminInvoiceDto, 
  AdminPaymentMethodDto, 
  AdminSubscriptionKPIDataDto 
} from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_dtos/admin-subscriptions-response.dto.js';
import { AdminSubscriptionsQueryService } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_services/admin-subscriptions-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / subscriptions')
@Controller('admin/subscriptions')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminSubscriptionsQueryController boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsQueryController {
  constructor(private readonly service: AdminSubscriptionsQueryService) {}

  // SLA: STANDARD
  @Get('fetchSubscription')
  @ApiOperation({ summary: 'Execute fetchSubscription' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCurrentSubscriptionDto })
  async findSubscription(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminCurrentSubscriptionDto> {
    return this.service.findSubscription(query);
  }

  // SLA: STANDARD
  @Get('fetchPlans')
  @ApiOperation({ summary: 'Execute fetchPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminSaaSPlanDto] })
  async findAllPlans(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminSaaSPlanDto[]> {
    return this.service.findAllPlans(query);
  }

  // SLA: STANDARD
  @Get('fetchInvoices')
  @ApiOperation({ summary: 'Execute fetchInvoices' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminInvoiceDto] })
  async findAllInvoices(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminCorePaginatedResult<AdminInvoiceDto>> {
    return this.service.findAllInvoices(query);
  }

  // SLA: STANDARD
  @Get('fetchPaymentMethods')
  @ApiOperation({ summary: 'Execute fetchPaymentMethods' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPaymentMethodDto] })
  async findAllPaymentMethods(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminPaymentMethodDto[]> {
    return this.service.findAllPaymentMethods(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSubscriptionKPIDataDto })
  async findSubscriptionKpis(@Query() query: AdminSubscriptionsQueryDto): Promise<AdminSubscriptionKPIDataDto> {
    return this.service.findSubscriptionKpis(query);
  }

}
