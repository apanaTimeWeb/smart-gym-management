import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdatePlansService } from '../services/update-plans.service';

@ApiTags('Plans')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdatePlansController {
  constructor(private readonly plansService: UpdatePlansService) {}
  
  @Patch()
  async execute() {
    return this.plansService.execute();
  }
}
