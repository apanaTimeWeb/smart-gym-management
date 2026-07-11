import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-logs.entity';
import { GlobalAuditLog } from './entities/global-audit-log.entity';
import { CreateAuditLogsController } from './controllers/create-audit-logs.controller';
import { FindAuditLogsController } from './controllers/find-audit-logs.controller';
import { UpdateAuditLogsController } from './controllers/update-audit-logs.controller';
import { DeleteAuditLogsController } from './controllers/delete-audit-logs.controller';
import { CreateAuditLogsService } from './services/create-audit-logs.service';
import { FindAuditLogsService } from './services/find-audit-logs.service';
import { UpdateAuditLogsService } from './services/update-audit-logs.service';
import { DeleteAuditLogsService } from './services/delete-audit-logs.service';
import { AuditLogsRepository } from './audit-logs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog, GlobalAuditLog])],
  controllers: [CreateAuditLogsController, FindAuditLogsController, UpdateAuditLogsController, DeleteAuditLogsController],
  providers: [CreateAuditLogsService, FindAuditLogsService, UpdateAuditLogsService, DeleteAuditLogsService, AuditLogsRepository],
  exports: [CreateAuditLogsService, FindAuditLogsService, UpdateAuditLogsService, DeleteAuditLogsService],
})
export class AuditLogsModule {}
