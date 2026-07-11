import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteSystemService } from '../services/delete-system.service';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteSystemController {
  constructor(private readonly systemService: DeleteSystemService) {}
  
  @Delete()
  async execute() {
    return this.systemService.execute();
  }
}
