import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindInfrastructureByIdService } from '../services/find-infrastructure-by-id.service';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindInfrastructureByIdController {
  constructor(private readonly service: FindInfrastructureByIdService) {}
  
  @Get(':id')
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
