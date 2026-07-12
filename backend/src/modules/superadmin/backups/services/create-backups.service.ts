import { CreateBackupRecordDto } from '../dto/create-backups.dto';
import { Injectable, Logger } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { BackupStatus } from '../backups.interfaces';

@Injectable()
export class CreateBackupsService {
  private readonly logger = new Logger(CreateBackupsService.name);

  constructor(
    private readonly repository: BackupsRepository,
    @InjectQueue('backups') private readonly backupsQueue: Queue,
  ) {}
  
  async execute(dto: CreateBackupRecordDto): Promise<any> {
    this.logger.log(`Initiating backup creation for tenant: ${dto.tenantName}`);
    
    // Create initial record in PENDING/IN_PROGRESS state
    const record = await this.repository.create({
      tenantName: dto.tenantName,
      databaseName: dto.databaseName || `tenant_db_${dto.tenantName}`,
      status: BackupStatus.IN_PROGRESS,
      sizeMB: dto.sizeMB || 0,
    });

    // Enqueue the job for the BullMQ worker
    await this.backupsQueue.add('dump-database', { 
      backupId: record.id,
      tenantName: dto.tenantName
    });

    this.logger.log(`Enqueued dump-database job for backup ${record.id}`);

    return {
      success: true,
      message: 'Backup process initiated successfully',
      data: record
    };
  }
}
