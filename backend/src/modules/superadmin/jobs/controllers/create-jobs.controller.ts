import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateJobsService } from '../services/create-jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateJobsController {
  constructor(private readonly jobsService: CreateJobsService) {}
  
  @Post()
  async execute() {
    return this.jobsService.execute();
  }
}
