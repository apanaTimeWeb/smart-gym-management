// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { StoreCreateOrderRequestDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-create-order.request.dto';
import { StoreCreateOrderResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-create-order.response.dto';
import { StoreCreateProductRequestDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-create-product.request.dto';
import { StoreCreateProductResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-create-product.response.dto';
import { StoreDeleteProductResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-delete-product.response.dto';
import { StoreUpdateProductRequestDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-update-product.request.dto';
import { StoreUpdateProductResponseDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-update-product.response.dto';
import { StoreCreateOrderService } from '@/backend_manager/modules/backend_manager/store/services/store-create-order.service';
import { StoreCreateProductService } from '@/backend_manager/modules/backend_manager/store/services/store-create-product.service';
import { StoreDeleteProductService } from '@/backend_manager/modules/backend_manager/store/services/store-delete-product.service';
import { StoreUpdateProductService } from '@/backend_manager/modules/backend_manager/store/services/store-update-product.service';

@Controller('manager')
@ApiTags('Manager store')
@Roles(CoreRole.MANAGER)
export class StoreCommandController {
  constructor(private readonly createProductService: StoreCreateProductService, private readonly updateProductService: StoreUpdateProductService, private readonly deleteProductService: StoreDeleteProductService, private readonly createOrderService: StoreCreateOrderService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("store/orders")
  @ApiOperation({ summary: 'createOrder for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: StoreCreateOrderResponseDto })
  createOrder(@Body() dto: StoreCreateOrderRequestDto): ReturnType<StoreCreateOrderService['createOrder']> { return this.createOrderService.createOrder(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("store/products")
  @ApiOperation({ summary: 'createProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: StoreCreateProductResponseDto })
  createProduct(@Body() dto: StoreCreateProductRequestDto): ReturnType<StoreCreateProductService['createProduct']> { return this.createProductService.createProduct(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("store/products/:id")
  @ApiOperation({ summary: 'updateProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: StoreUpdateProductResponseDto })
  updateProduct(@Param('id') id: string, @Body() dto: StoreUpdateProductRequestDto): ReturnType<StoreUpdateProductService['updateProduct']> { return this.updateProductService.updateProduct(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("store/products/:id")
  @ApiOperation({ summary: 'deleteProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: StoreDeleteProductResponseDto })
  deleteProduct(@Param('id') id: string): ReturnType<StoreDeleteProductService['deleteProduct']> {  return this.deleteProductService.deleteProduct(id); }


}
