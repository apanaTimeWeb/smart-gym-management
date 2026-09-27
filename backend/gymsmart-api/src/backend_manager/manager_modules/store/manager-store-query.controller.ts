// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerStoreFetchOrdersResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-fetch-orders.response.dto';
import { ManagerStoreFetchProductsResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-fetch-products.response.dto';
import { ManagerStoreFetchStoreSummaryResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-fetch-store-summary.response.dto';
import { ManagerStoreQueryDto } from '@/backend_manager/manager_modules/store/store_dtos/manager-store-query.dto';
import { ManagerStoreFindOrdersService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-orders.service';
import { ManagerStoreFindProductsService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-products.service';
import { ManagerStoreFindStoreSummaryService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-store-summary.service';

@Controller('manager')
@ApiTags('Manager store')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerStoreQueryController {
  constructor(private readonly fetchProductsService: ManagerStoreFindProductsService, private readonly fetchOrdersService: ManagerStoreFindOrdersService, private readonly fetchStoreSummaryService: ManagerStoreFindStoreSummaryService) {}

  // SLA: STANDARD
  @Get("store/orders")
  @ApiOperation({ summary: 'findOrders for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerStoreFetchOrdersResponseDto })
  findOrders(@Query() query: ManagerStoreQueryDto): ReturnType<ManagerStoreFindOrdersService['findOrders']> { return this.fetchOrdersService.findOrders(query); }


  // SLA: STANDARD
  @Get("store/products")
  @ApiOperation({ summary: 'findProducts for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerStoreFetchProductsResponseDto })
  findProducts(@Query() query: ManagerStoreQueryDto): ReturnType<ManagerStoreFindProductsService['findProducts']> { return this.fetchProductsService.findProducts(query); }


  // SLA: FAST
  @Get("store/summary")
  @ApiOperation({ summary: 'findStoreSummary for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerStoreFetchStoreSummaryResponseDto })
  findStoreSummary(@Query() query: ManagerStoreQueryDto): ReturnType<ManagerStoreFindStoreSummaryService['findStoreSummary']> { return this.fetchStoreSummaryService.findStoreSummary(query); }


}

export { ManagerStoreQueryController as StoreQueryController };
