import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteInfrastructureService } from '../services/delete-infrastructure.service';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteInfrastructureController {
  constructor(private readonly infrastructureService: DeleteInfrastructureService) {}
  
  @Delete()
  async execute() {
    return this.infrastructureService.execute();
  }
}
