// RESPONSIBILITY: Registers the global-audit feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { GlobalAuditInvestigationQueryController } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-investigation-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalAuditContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-contract-snapshot.entity';
import { GlobalAuditEntity } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.entity';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.repository';
import { GlobalAuditQueryController } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-query.controller';
import { GlobalAuditCommandController } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-command.controller';
import { GlobalAuditListService } from '@/backend_superadmin/modules/backend_superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/backend_superadmin/modules/backend_superadmin/global-audit/services/global-audit-find.service';
import { GlobalAuditCreateService } from '@/backend_superadmin/modules/backend_superadmin/global-audit/services/global-audit-create.service';
import { GlobalAuditUpdateService } from '@/backend_superadmin/modules/backend_superadmin/global-audit/services/global-audit-update.service';
import { GlobalAuditDeleteService } from '@/backend_superadmin/modules/backend_superadmin/global-audit/services/global-audit-delete.service';
import { GlobalAuditInvestigationService } from '@/backend_superadmin/modules/backend_superadmin/global-audit/services/global-audit-investigation.service';
import { GlobalAuditAuditLogsQueryController } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-audit-logs-query.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalAuditContractSnapshotEntity, GlobalAuditEntity])],
  controllers: [GlobalAuditQueryController, GlobalAuditCommandController, GlobalAuditAuditLogsQueryController, GlobalAuditInvestigationQueryController],
  providers: [GlobalAuditInvestigationService, GlobalAuditRepository, GlobalAuditListService, GlobalAuditFindService, GlobalAuditCreateService, GlobalAuditUpdateService, GlobalAuditDeleteService],
  exports: [GlobalAuditRepository],
})
export class GlobalAuditModule {}