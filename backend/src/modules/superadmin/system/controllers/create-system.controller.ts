import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateSystemService } from '../services/create-system.service';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateSystemController {
  constructor(private readonly systemService: CreateSystemService) {}
  
  @Post()
  async execute() {
    return this.systemService.execute();
  }
}
