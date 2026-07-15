import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateInfrastructureService } from '../services/update-infrastructure.service';
import { UpdateInfrastructureDto } from '../dto/update-infrastructure.dto';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateInfrastructureController {
  constructor(private readonly service: UpdateInfrastructureService) {}
  
  @Patch(':id')
  async execute(@Param('id') id: string, @Body() dto: UpdateInfrastructureDto) {
    return this.service.execute(id, dto);
  }
}
