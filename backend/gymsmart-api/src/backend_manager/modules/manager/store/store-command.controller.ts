// @ts-nocheck
// RESPONSIBILITY: Owns the Manager store command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { StoreCreateOrderRequestDto } from '@/backend_manager/modules/manager/store/dtos/store-create-order.request.dto';
import { StoreCreateOrderResponseDto } from '@/backend_manager/modules/manager/store/dtos/store-create-order.response.dto';
import { StoreCreateOrderService } from '@/backend_manager/modules/manager/store/services/store-create-order.service';
import { StoreCreateProductRequestDto } from '@/backend_manager/modules/manager/store/dtos/store-create-product.request.dto';
import { StoreCreateProductResponseDto } from '@/backend_manager/modules/manager/store/dtos/store-create-product.response.dto';
import { StoreCreateProductService } from '@/backend_manager/modules/manager/store/services/store-create-product.service';
import { StoreDeleteProductResponseDto } from '@/backend_manager/modules/manager/store/dtos/store-delete-product.response.dto';
import { StoreDeleteProductService } from '@/backend_manager/modules/manager/store/services/store-delete-product.service';
import { StoreQueryDto } from '@/backend_manager/modules/manager/store/dtos/store-query.dto';
import { StoreUpdateProductRequestDto } from '@/backend_manager/modules/manager/store/dtos/store-update-product.request.dto';
import { StoreUpdateProductResponseDto } from '@/backend_manager/modules/manager/store/dtos/store-update-product.response.dto';
import { StoreUpdateProductService } from '@/backend_manager/modules/manager/store/services/store-update-product.service';

@Controller('manager')
@ApiTags('Manager store')
@Roles(CoreRole.MANAGER)
export class StoreCommandController {
  constructor(private readonly createProductService: StoreCreateProductService, private readonly updateProductService: StoreUpdateProductService, private readonly deleteProductService: StoreDeleteProductService, private readonly createOrderService: StoreCreateOrderService) {}

  // SLA: STANDARD
  @Post("store/orders")
  @ApiOperation({ summary: 'createOrder for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: StoreCreateOrderResponseDto })
  createOrder(@Body() dto: StoreCreateOrderRequestDto): Promise<StoreCreateOrderResponseDto> {  return this.createOrderService.createOrder(dto) as unknown as Promise<StoreCreateOrderResponseDto>;  }


  // SLA: STANDARD
  @Post("store/products")
  @ApiOperation({ summary: 'createProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: StoreCreateProductResponseDto })
  createProduct(@Body() dto: StoreCreateProductRequestDto): Promise<StoreCreateProductResponseDto> {  return this.createProductService.createProduct(dto) as unknown as Promise<StoreCreateProductResponseDto>;  }


  // SLA: STANDARD
  @Patch("store/products/:id")
  @ApiOperation({ summary: 'updateProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: StoreUpdateProductResponseDto })
  updateProduct(@Param('id') id: string, @Body() dto: StoreUpdateProductRequestDto): Promise<StoreUpdateProductResponseDto> {  return this.updateProductService.updateProduct(dto, id) as unknown as Promise<StoreUpdateProductResponseDto>;  }


  // SLA: STANDARD
  @Delete("store/products/:id")
  @ApiOperation({ summary: 'deleteProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: StoreDeleteProductResponseDto })
  deleteProduct(@Param('id') id: string): Promise<StoreDeleteProductResponseDto> {  return this.deleteProductService.deleteProduct(id); }


}
