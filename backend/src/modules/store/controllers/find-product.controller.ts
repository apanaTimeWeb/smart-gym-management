import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { FindProductService } from '../services/find-product.service';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/products')
export class FindProductController {
  constructor(private readonly findProductService: FindProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all active products' })
  execute(@Query() query: PaginationQueryDto) {
    return this.findProductService.execute(query);
  }
}
