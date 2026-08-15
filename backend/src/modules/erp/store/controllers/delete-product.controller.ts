import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteProductService } from '../services/delete-product.service';

@ApiTags('Store')
@Controller('store/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteProductController {
  constructor(private readonly service: DeleteProductService) {}
  @Delete(':id')
  async execute(@Param('id') id: string) { return this.service.execute(id); }
}
