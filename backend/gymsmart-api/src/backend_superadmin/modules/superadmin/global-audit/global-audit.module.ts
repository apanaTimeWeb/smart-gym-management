// RESPONSIBILITY: Registers the global-audit feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalAuditContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-contract-snapshot.entity';
import { GlobalAuditContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-contract-snapshot.repository';
import { AuditLogEntity } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.entity';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditQueryController } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-query.controller';
import { GlobalAuditCommandController } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-command.controller';
import { GlobalAuditListService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-find.service';
import { GlobalAuditCreateService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-create.service';
import { GlobalAuditUpdateService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-update.service';
import { GlobalAuditDeleteService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-delete.service';
import { GlobalAuditInvestigationService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-investigation.service';
import { GlobalAuditSpecialController } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-special.controller';
import { GlobalAuditFrontendContractController } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-frontend-contract.controller';
@Module({
  imports: [TypeOrmModule.forFeature([GlobalAuditContractSnapshotEntity, AuditLogEntity])],
  controllers: [GlobalAuditQueryController, GlobalAuditCommandController, GlobalAuditSpecialController, GlobalAuditFrontendContractController],
  providers: [GlobalAuditContractSnapshotRepository, GlobalAuditInvestigationService, GlobalAuditRepository, GlobalAuditListService, GlobalAuditFindService, GlobalAuditCreateService, GlobalAuditUpdateService, GlobalAuditDeleteService],
  exports: [GlobalAuditRepository],
})
export class GlobalAuditModule {}
