import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateInfrastructureService } from '../services/create-infrastructure.service';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateInfrastructureController {
  constructor(private readonly infrastructureService: CreateInfrastructureService) {}
  
  @Post()
  async execute(@Body() dto: any) {
    return this.infrastructureService.execute(dto);
  }
}
