import { GlobalAuditLogsService } from './services/global-audit-logs.service';
import { TenantAuditLogsService } from './services/tenant-audit-logs.service';
import { GlobalAuditLogsController } from './controllers/global-audit-logs.controller';
import { TenantAuditLogsController } from './controllers/tenant-audit-logs.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalAuditLog } from './entities/audit-logs.entity';
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
  imports: [TypeOrmModule.forFeature([GlobalAuditLog])],
  controllers: [GlobalAuditLogsController, TenantAuditLogsController, CreateAuditLogsController, FindAuditLogsController, UpdateAuditLogsController, DeleteAuditLogsController],
  providers: [GlobalAuditLogsService, TenantAuditLogsService, CreateAuditLogsService, FindAuditLogsService, UpdateAuditLogsService, DeleteAuditLogsService, AuditLogsRepository],
  exports: [CreateAuditLogsService, FindAuditLogsService, UpdateAuditLogsService, DeleteAuditLogsService],
})
export class AuditLogsModule {}
