import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_BACKGROUND_JOBS } from '../../superadmin.constants';
import { CreateJobDto } from '../dto/create-jobs.dto';
import { UpdateJobDto } from '../dto/update-jobs.dto';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  create(createDto: CreateJobDto) {
    this.logger.log(`Registering background job: ${createDto.jobName}`);
    return {
      success: true,
      message: 'Background job registered successfully',
      data: {
        id: `job-${Date.now()}`,
        ...createDto,
        status: createDto.status ?? 'WAITING',
        attempts: createDto.attempts ?? 0,
        error: null,
        createdAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all background jobs');
    return {
      success: true,
      message: 'Background jobs fetched successfully',
      data: DUMMY_BACKGROUND_JOBS,
      meta: {
        total: DUMMY_BACKGROUND_JOBS.length,
        failed: DUMMY_BACKGROUND_JOBS.filter((j) => j.status === 'FAILED').length,
        active: DUMMY_BACKGROUND_JOBS.filter((j) => j.status === 'ACTIVE').length,
        completed: DUMMY_BACKGROUND_JOBS.filter((j) => j.status === 'COMPLETED').length,
      },
    };
  }

  findOne(id: string) {
    const job = DUMMY_BACKGROUND_JOBS.find((j) => j.id === id);
    if (!job) {
      throw new NotFoundException(`Background job with ID "${id}" not found`);
    }
    return { success: true, message: 'Background job fetched successfully', data: job };
  }

  update(id: string, updateDto: UpdateJobDto) {
    const job = DUMMY_BACKGROUND_JOBS.find((j) => j.id === id);
    if (!job) {
      throw new NotFoundException(`Background job with ID "${id}" not found`);
    }
    this.logger.log(`Updating background job: ${id}`);
    return {
      success: true,
      message: 'Background job updated successfully',
      data: { ...job, ...updateDto },
    };
  }

  remove(id: string) {
    const job = DUMMY_BACKGROUND_JOBS.find((j) => j.id === id);
    if (!job) {
      throw new NotFoundException(`Background job with ID "${id}" not found`);
    }
    this.logger.log(`Removing background job record: ${id}`);
    return {
      success: true,
      message: 'Background job record removed',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
