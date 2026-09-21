// RESPONSIBILITY: Registers the global-audit feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalAuditContractSnapshotEntity } from '@/modules/superadmin/global-audit/global-audit-contract-snapshot.entity';
import { GlobalAuditContractSnapshotRepository } from '@/modules/superadmin/global-audit/global-audit-contract-snapshot.repository';
import { AuditLogEntity } from '@/modules/superadmin/global-audit/global-audit.entity';
import { GlobalAuditRepository } from '@/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditQueryController } from '@/modules/superadmin/global-audit/global-audit-query.controller';
import { GlobalAuditCommandController } from '@/modules/superadmin/global-audit/global-audit-command.controller';
import { GlobalAuditListService } from '@/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/modules/superadmin/global-audit/services/global-audit-find.service';
import { GlobalAuditCreateService } from '@/modules/superadmin/global-audit/services/global-audit-create.service';
import { GlobalAuditUpdateService } from '@/modules/superadmin/global-audit/services/global-audit-update.service';
import { GlobalAuditDeleteService } from '@/modules/superadmin/global-audit/services/global-audit-delete.service';
import { GlobalAuditInvestigationService } from '@/modules/superadmin/global-audit/services/global-audit-investigation.service';
import { GlobalAuditSpecialController } from '@/modules/superadmin/global-audit/global-audit-special.controller';
import { GlobalAuditFrontendContractController } from '@/modules/superadmin/global-audit/global-audit-frontend-contract.controller';
@Module({
  imports: [TypeOrmModule.forFeature([GlobalAuditContractSnapshotEntity, AuditLogEntity])],
  controllers: [GlobalAuditQueryController, GlobalAuditCommandController, GlobalAuditSpecialController, GlobalAuditFrontendContractController],
  providers: [GlobalAuditContractSnapshotRepository, GlobalAuditInvestigationService, GlobalAuditRepository, GlobalAuditListService, GlobalAuditFindService, GlobalAuditCreateService, GlobalAuditUpdateService, GlobalAuditDeleteService],
  exports: [GlobalAuditRepository],
})
export class GlobalAuditModule {}
