import {
  Controller,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateProductService } from '../services/update-product.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/products')
export class UpdateProductController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product updated successfully',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProductService.execute(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product removed successfully',
  })
  remove(@Param('id') id: string) {
    return this.updateProductService.remove(+id);
  }
}
