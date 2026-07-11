import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateJobsService } from '../services/update-jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateJobsController {
  constructor(private readonly jobsService: UpdateJobsService) {}
  
  @Patch()
  async execute() {
    return this.jobsService.execute();
  }
}
