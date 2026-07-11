import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteJobsService } from '../services/delete-jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteJobsController {
  constructor(private readonly jobsService: DeleteJobsService) {}
  
  @Delete()
  async execute() {
    return this.jobsService.execute();
  }
}
