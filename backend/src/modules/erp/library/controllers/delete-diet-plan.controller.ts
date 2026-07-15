import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteDietPlanService } from '../services/delete-diet-plan.service';

@ApiTags('Library')
@Controller('library/diet-plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteDietPlanController {
  constructor(private readonly service: DeleteDietPlanService) {}
  @Delete(':id')
  async execute(@Param('id') id: string) { return this.service.execute(id); }
}
