import { Controller, Patch, Get, Post, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateJobsService } from '../services/update-jobs.service';
import { UpdateBackgroundJobDto } from '../dto/update-jobs.dto';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateJobsController {
  constructor(private readonly service: UpdateJobsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update BackgroundJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateBackgroundJobDto) {
    return this.service.execute(id, dto);
  }
}
