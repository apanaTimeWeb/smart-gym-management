// RESPONSIBILITY: Registers the global-audit feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminGlobalAuditInvestigationQueryController } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-investigation-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminGlobalAuditContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-contract-snapshot.entity';
import { SuperadminGlobalAuditEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.entity';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';
import { SuperadminGlobalAuditQueryController } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-query.controller';
import { SuperadminGlobalAuditCommandController } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-command.controller';
import { SuperadminGlobalAuditListService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-list.service';
import { SuperadminGlobalAuditFindService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-find.service';
import { SuperadminGlobalAuditCreateService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-create.service';
import { SuperadminGlobalAuditUpdateService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-update.service';
import { SuperadminGlobalAuditDeleteService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-delete.service';
import { SuperadminGlobalAuditInvestigationService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-investigation.service';
import { SuperadminGlobalAuditAuditLogsQueryController } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-audit-logs-query.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminGlobalAuditContractSnapshotEntity, SuperadminGlobalAuditEntity])],
  controllers: [SuperadminGlobalAuditQueryController, SuperadminGlobalAuditCommandController, SuperadminGlobalAuditAuditLogsQueryController, SuperadminGlobalAuditInvestigationQueryController],
  providers: [SuperadminGlobalAuditInvestigationService, SuperadminGlobalAuditRepository, SuperadminGlobalAuditListService, SuperadminGlobalAuditFindService, SuperadminGlobalAuditCreateService, SuperadminGlobalAuditUpdateService, SuperadminGlobalAuditDeleteService],
  exports: [SuperadminGlobalAuditRepository],
})
export class SuperadminGlobalAuditModule {}