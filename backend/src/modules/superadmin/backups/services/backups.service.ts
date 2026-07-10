import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_BACKUPS } from '../../superadmin.constants';
import { CreateBackupDto } from '../dto/create-backups.dto';
import { UpdateBackupDto } from '../dto/update-backups.dto';

@Injectable()
export class BackupsService {
  private readonly logger = new Logger(BackupsService.name);

  create(createDto: CreateBackupDto) {
    this.logger.log(`Initiating backup for: ${createDto.tenantName}`);
    return {
      success: true,
      message: 'Database backup initiated successfully',
      data: {
        id: `bkp-${Date.now()}`,
        ...createDto,
        sizeMB: createDto.sizeMB ?? 0,
        status: createDto.status ?? 'IN_PROGRESS',
        createdAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all backup records');
    return {
      success: true,
      message: 'Backup records fetched successfully',
      data: DUMMY_BACKUPS,
      meta: {
        total: DUMMY_BACKUPS.length,
        successful: DUMMY_BACKUPS.filter((b) => b.status === 'SUCCESS').length,
        failed: DUMMY_BACKUPS.filter((b) => b.status === 'FAILED').length,
        inProgress: DUMMY_BACKUPS.filter((b) => b.status === 'IN_PROGRESS').length,
        totalSizeMB: DUMMY_BACKUPS.reduce((sum, b) => sum + b.sizeMB, 0),
      },
    };
  }

  findOne(id: string) {
    const backup = DUMMY_BACKUPS.find((b) => b.id === id);
    if (!backup) {
      throw new NotFoundException(`Backup record with ID "${id}" not found`);
    }
    return { success: true, message: 'Backup record fetched successfully', data: backup };
  }

  update(id: string, updateDto: UpdateBackupDto) {
    const backup = DUMMY_BACKUPS.find((b) => b.id === id);
    if (!backup) {
      throw new NotFoundException(`Backup record with ID "${id}" not found`);
    }
    this.logger.log(`Updating backup record: ${id}`);
    return {
      success: true,
      message: 'Backup record updated successfully',
      data: { ...backup, ...updateDto },
    };
  }

  remove(id: string) {
    const backup = DUMMY_BACKUPS.find((b) => b.id === id);
    if (!backup) {
      throw new NotFoundException(`Backup record with ID "${id}" not found`);
    }
    this.logger.log(`Removing backup record: ${id}`);
    return {
      success: true,
      message: 'Backup record removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
