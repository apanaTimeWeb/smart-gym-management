import { UpdateTenantDto } from '../dto/update-gyms.dto';
import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { StatusGymsService } from '../services/status-gyms.service';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StatusGymsController {
  constructor(private readonly service: StatusGymsService) {}
  
  @Patch(':id/status')
  async execute(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.execute(id, dto);
  }
}
