import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateGymsService } from '../services/create-gyms.service';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateGymsController {
  constructor(private readonly gymsService: CreateGymsService) {}
  
  @Post()
  async execute() {
    return this.gymsService.execute();
  }
}
