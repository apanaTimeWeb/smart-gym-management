import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindJobsService } from '../services/find-jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindJobsController {
  constructor(private readonly jobsService: FindJobsService) {}
  
  @Get()
  async execute() {
    return this.jobsService.execute();
  }
}
