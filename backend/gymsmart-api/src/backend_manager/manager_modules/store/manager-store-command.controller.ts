// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerStoreCreateOrderRequestDto } from '@/backend_manager/manager_modules/store/store_dtos/manager-store-create-order.request.dto';
import { ManagerStoreCreateOrderResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-create-order.response.dto';
import { ManagerStoreCreateProductRequestDto } from '@/backend_manager/manager_modules/store/store_dtos/manager-store-create-product.request.dto';
import { ManagerStoreCreateProductResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-create-product.response.dto';
import { ManagerStoreDeleteProductResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-delete-product.response.dto';
import { ManagerStoreUpdateProductRequestDto } from '@/backend_manager/manager_modules/store/store_dtos/manager-store-update-product.request.dto';
import { ManagerStoreUpdateProductResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-update-product.response.dto';
import { ManagerStoreCreateOrderService } from '@/backend_manager/manager_modules/store/store_services/manager-store-create-order.service';
import { ManagerStoreCreateProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-create-product.service';
import { ManagerStoreDeleteProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-delete-product.service';
import { ManagerStoreUpdateProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-update-product.service';

@Controller('manager')
@ApiTags('Manager store')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerStoreCommandController {
  constructor(private readonly createProductService: ManagerStoreCreateProductService, private readonly updateProductService: ManagerStoreUpdateProductService, private readonly deleteProductService: ManagerStoreDeleteProductService, private readonly createOrderService: ManagerStoreCreateOrderService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("store/orders")
  @ApiOperation({ summary: 'createOrder for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerStoreCreateOrderResponseDto })
  createOrder(@Body() dto: ManagerStoreCreateOrderRequestDto): ReturnType<ManagerStoreCreateOrderService['createOrder']> { return this.createOrderService.createOrder(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("store/products")
  @ApiOperation({ summary: 'createProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerStoreCreateProductResponseDto })
  createProduct(@Body() dto: ManagerStoreCreateProductRequestDto): ReturnType<ManagerStoreCreateProductService['createProduct']> { return this.createProductService.createProduct(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("store/products/:id")
  @ApiOperation({ summary: 'updateProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerStoreUpdateProductResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateProduct(@Param('id') id: string, @Body() dto: ManagerStoreUpdateProductRequestDto): ReturnType<ManagerStoreUpdateProductService['updateProduct']> { return this.updateProductService.updateProduct(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("store/products/:id")
  @ApiOperation({ summary: 'deleteProduct for Manager store' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerStoreDeleteProductResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteProduct(@Param('id') id: string): ReturnType<ManagerStoreDeleteProductService['deleteProduct']> {  return this.deleteProductService.deleteProduct(id); }


}

export { ManagerStoreCommandController as StoreCommandController };
