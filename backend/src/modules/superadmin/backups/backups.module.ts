import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupRecord } from './entities/backups.entity';
import { CreateBackupsController } from './controllers/create-backups.controller';
import { FindBackupsController } from './controllers/find-backups.controller';
import { UpdateBackupsController } from './controllers/update-backups.controller';
import { DeleteBackupsController } from './controllers/delete-backups.controller';
import { CreateBackupsService } from './services/create-backups.service';
import { FindBackupsService } from './services/find-backups.service';
import { UpdateBackupsService } from './services/update-backups.service';
import { DeleteBackupsService } from './services/delete-backups.service';
import { BackupsRepository } from './backups.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BackupRecord])],
  controllers: [CreateBackupsController, FindBackupsController, UpdateBackupsController, DeleteBackupsController],
  providers: [CreateBackupsService, FindBackupsService, UpdateBackupsService, DeleteBackupsService, BackupsRepository],
})
export class BackupsModule {}
