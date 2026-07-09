import {
  Controller,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdatePlanService } from '@/modules/plans/services/update-plan.service';
import { UpdatePlanDto } from '@/modules/plans/dto/update-plan.dto';

@ApiTags('Plans - Update')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdatePlanController {
  constructor(private readonly updatePlanService: UpdatePlanService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plan by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Plan updated successfully',
  })
  update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.updatePlanService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a plan by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Plan deactivated successfully',
  })
  remove(@Param('id') id: string) {
    return this.updatePlanService.remove(id);
  }
}
