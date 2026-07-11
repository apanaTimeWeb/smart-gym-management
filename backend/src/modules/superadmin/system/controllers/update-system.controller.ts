import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateSystemService } from '../services/update-system.service';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateSystemController {
  constructor(private readonly systemService: UpdateSystemService) {}
  
  @Patch()
  async execute() {
    return this.systemService.execute();
  }
}
