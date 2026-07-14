import { Injectable, Logger } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JobResponse } from '../jobs.interfaces';
import { JOBS_MESSAGES, JOBS_ERRORS } from '../jobs.constants';

@Injectable()
export class FindJobsService {
  private readonly logger = new Logger(FindJobsService.name);

  constructor(
    private readonly repository: JobsRepository,
    @InjectQueue('broadcasts') private readonly broadcastsQueue: Queue,
    @InjectQueue('backups') private readonly backupsQueue: Queue,
  ) {}
  
  async execute(): Promise<JobResponse> {
    this.logger.log('Fetching job queue counts');
    
    try {
      const broadcastsCounts = await this.broadcastsQueue.getJobCounts();
      const backupsCounts = await this.backupsQueue.getJobCounts();

      // Return unified response
      return {
        success: true,
        message: JOBS_MESSAGES.FETCHED,
        data: {
          queues: {
            broadcasts: broadcastsCounts,
            backups: backupsCounts
          },
          totalJobs: Object.values(broadcastsCounts).reduce((a, b) => a + b, 0) + 
                     Object.values(backupsCounts).reduce((a, b) => a + b, 0)
        }
      };
    } catch (error) {
      this.logger.error('Failed to fetch job queue counts', error);
      // Fallback to DB repository if Redis is down
      const data = await this.repository.findAll();
      return { success: false, message: 'Redis connection failed', data };
    }
  }

  async findOne(id: string): Promise<JobResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(JOBS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: JOBS_MESSAGES.FETCHED,
      data
    };
  }
}
