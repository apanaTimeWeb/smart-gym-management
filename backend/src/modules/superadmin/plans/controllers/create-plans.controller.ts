import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreatePlansService } from '../services/create-plans.service';

@ApiTags('Plans')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreatePlansController {
  constructor(private readonly plansService: CreatePlansService) {}
  
  @Post()
  async execute() {
    return this.plansService.execute();
  }
}
