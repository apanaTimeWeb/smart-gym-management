import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteInfrastructureService } from '../services/delete-infrastructure.service';

@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteInfrastructureController {
  constructor(private readonly service: DeleteInfrastructureService) {}
  
  @Delete(':id')
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
