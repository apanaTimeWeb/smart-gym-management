import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateJobsService } from '../services/create-jobs.service';
import { CreateBackgroundJobDto } from '../dto/create-jobs.dto';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateJobsController {
  constructor(private readonly service: CreateJobsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create BackgroundJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateBackgroundJobDto) {
    return this.service.execute(dto);
  }
}
