// RESPONSIBILITY: Owns the Manager store query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { StoreFetchOrdersResponseDto } from '@/modules/manager/store/dtos/store-fetch-orders.response.dto';
import { StoreFetchOrdersService } from '@/modules/manager/store/services/store-fetch-orders.service';
import { StoreFetchProductsResponseDto } from '@/modules/manager/store/dtos/store-fetch-products.response.dto';
import { StoreFetchProductsService } from '@/modules/manager/store/services/store-fetch-products.service';
import { StoreFetchStoreSummaryResponseDto } from '@/modules/manager/store/dtos/store-fetch-store-summary.response.dto';
import { StoreFetchStoreSummaryService } from '@/modules/manager/store/services/store-fetch-store-summary.service';
import { StoreQueryDto } from '@/modules/manager/store/dtos/store-query.dto';

@Controller('manager')
@ApiTags('Manager store')
@Roles(CoreRole.MANAGER)
export class StoreQueryController {
  constructor(private readonly fetchProductsService: StoreFetchProductsService, private readonly fetchOrdersService: StoreFetchOrdersService, private readonly fetchStoreSummaryService: StoreFetchStoreSummaryService) {}

  // SLA: STANDARD
  @Get("store/orders")
  @ApiOperation({ summary: 'fetchOrders for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: StoreFetchOrdersResponseDto })
  fetchOrders(@Query() query: StoreQueryDto): Promise<StoreFetchOrdersResponseDto> {  return this.fetchOrdersService.fetchOrders(query) as Promise<StoreFetchOrdersResponseDto>;  }


  // SLA: STANDARD
  @Get("store/products")
  @ApiOperation({ summary: 'fetchProducts for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: StoreFetchProductsResponseDto })
  fetchProducts(@Query() query: StoreQueryDto): Promise<StoreFetchProductsResponseDto> {  return this.fetchProductsService.fetchProducts(query) as Promise<StoreFetchProductsResponseDto>;  }


  // SLA: FAST
  @Get("store/summary")
  @ApiOperation({ summary: 'fetchStoreSummary for Manager store' })
  @ApiResponse({ status: HttpStatus.OK, type: StoreFetchStoreSummaryResponseDto })
  fetchStoreSummary(@Query() query: StoreQueryDto): Promise<StoreFetchStoreSummaryResponseDto> {  return this.fetchStoreSummaryService.fetchStoreSummary(query) as Promise<StoreFetchStoreSummaryResponseDto>;  }


}
