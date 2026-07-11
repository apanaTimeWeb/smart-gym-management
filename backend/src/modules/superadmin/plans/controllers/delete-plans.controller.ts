import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeletePlansService } from '../services/delete-plans.service';

@ApiTags('Plans')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeletePlansController {
  constructor(private readonly plansService: DeletePlansService) {}
  
  @Delete()
  async execute() {
    return this.plansService.execute();
  }
}
