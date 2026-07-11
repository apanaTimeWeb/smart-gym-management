import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindInfrastructureService } from '../services/find-infrastructure.service';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindInfrastructureController {
  constructor(private readonly infrastructureService: FindInfrastructureService) {}
  
  @Get()
  async execute() {
    return this.infrastructureService.execute();
  }
}
