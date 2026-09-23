// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { StoreFetchOrdersResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-fetch-orders.response.dto';
import { StoreFetchProductsResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-fetch-products.response.dto';
import { StoreFetchStoreSummaryResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-fetch-store-summary.response.dto';
import { StoreQueryDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-query.dto';
import { StoreFetchOrdersService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-orders.service';
import { StoreFetchProductsService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-products.service';
import { StoreFetchStoreSummaryService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-store-summary.service';

@Controller('manager')
@ApiTags('Manager store')
@Roles(CoreRole.MANAGER)
export class StoreQueryController {
  constructor(private readonly fetchProductsService: StoreFetchProductsService, private readonly fetchOrdersService: StoreFetchOrdersService, private readonly fetchStoreSummaryService: StoreFetchStoreSummaryService) {}

  // SLA: STANDARD
  @Get("store/orders")
  @ApiOperation({ summary: 'fetchOrders for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: StoreFetchOrdersResponseDto })
  fetchOrders(@Query() query: StoreQueryDto): ReturnType<StoreFetchOrdersService['fetchOrders']> { return this.fetchOrdersService.fetchOrders(query as any); }


  // SLA: STANDARD
  @Get("store/products")
  @ApiOperation({ summary: 'fetchProducts for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: StoreFetchProductsResponseDto })
  fetchProducts(@Query() query: StoreQueryDto): ReturnType<StoreFetchProductsService['fetchProducts']> { return this.fetchProductsService.fetchProducts(query as any); }


  // SLA: FAST
  @Get("store/summary")
  @ApiOperation({ summary: 'fetchStoreSummary for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: StoreFetchStoreSummaryResponseDto })
  fetchStoreSummary(@Query() query: StoreQueryDto): ReturnType<StoreFetchStoreSummaryService['fetchStoreSummary']> { return this.fetchStoreSummaryService.fetchStoreSummary(query as any); }


}
