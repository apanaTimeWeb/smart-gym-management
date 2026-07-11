import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindSystemService } from '../services/find-system.service';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindSystemController {
  constructor(private readonly systemService: FindSystemService) {}
  
  @Get()
  async execute() {
    return this.systemService.execute();
  }
}
