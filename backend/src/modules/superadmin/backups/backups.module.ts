import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupsService } from './services/backups.service';
import { BackupsController } from './controllers/backups.controller';
import { Backup } from './entities/backups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Backup])],
  controllers: [BackupsController],
  providers: [BackupsService],
})
export class BackupsModule {}
