import { Controller, Delete, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteJobsService } from '../services/delete-jobs.service';


@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteJobsController {
  constructor(private readonly service: DeleteJobsService) {}
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete BackgroundJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
