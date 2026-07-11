import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindPlansService } from '../services/find-plans.service';

@ApiTags('Plans')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindPlansController {
  constructor(private readonly plansService: FindPlansService) {}
  
  @Get()
  async execute() {
    return this.plansService.execute();
  }
}
