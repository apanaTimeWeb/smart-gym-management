import { Injectable, Logger } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class FindJobsService {
  private readonly logger = new Logger(FindJobsService.name);

  constructor(
    private readonly repository: JobsRepository,
    @InjectQueue('broadcasts') private readonly broadcastsQueue: Queue,
    @InjectQueue('backups') private readonly backupsQueue: Queue,
  ) {}
  
  async execute(): Promise<any> {
    this.logger.log('Fetching job queue counts');
    
    try {
      const broadcastsCounts = await this.broadcastsQueue.getJobCounts();
      const backupsCounts = await this.backupsQueue.getJobCounts();

      // Return unified response
      return {
        success: true,
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
      return { success: false, data: await this.repository.findAll(), error: 'Redis connection failed' };
    }
  }

  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('BackgroundJob not found');
    return entity;
  }
}
