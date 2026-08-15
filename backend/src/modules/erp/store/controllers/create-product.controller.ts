import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateProductService } from '@/modules/erp/store/services/create-product.service';
import { CreateProductDto } from '@/modules/erp/store/dto/create-product.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/products')
export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created successfully',
  })
  execute(@Body() dto: CreateProductDto) {
    return this.createProductService.execute(dto);
  }
}
