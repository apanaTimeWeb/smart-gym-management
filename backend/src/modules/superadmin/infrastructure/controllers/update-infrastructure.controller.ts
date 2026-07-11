import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateInfrastructureService } from '../services/update-infrastructure.service';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateInfrastructureController {
  constructor(private readonly infrastructureService: UpdateInfrastructureService) {}
  
  @Patch()
  async execute() {
    return this.infrastructureService.execute();
  }
}
