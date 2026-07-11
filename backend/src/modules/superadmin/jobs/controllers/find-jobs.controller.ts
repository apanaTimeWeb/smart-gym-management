import { Controller, Get, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindJobsService } from '../services/find-jobs.service';


@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindJobsController {
  constructor(private readonly service: FindJobsService) {}
  
  @Get()
  async executeAll() {
    return this.service.execute();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find BackgroundJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
