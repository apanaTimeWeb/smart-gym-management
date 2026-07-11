import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindGymsService } from '../services/find-gyms.service';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindGymsController {
  constructor(private readonly gymsService: FindGymsService) {}
  
  @Get()
  async execute() {
    return this.gymsService.execute();
  }
}
