// RESPONSIBILITY: Registers the invoices feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesContractSnapshotEntity } from '@/modules/superadmin/saas-billing/invoices/invoices-contract-snapshot.entity';
import { InvoicesContractSnapshotRepository } from '@/modules/superadmin/saas-billing/invoices/invoices-contract-snapshot.repository';
import { SaasInvoiceEntity } from '@/modules/superadmin/saas-billing/invoices/invoices.entity';
import { InvoicesRepository } from '@/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesQueryController } from '@/modules/superadmin/saas-billing/invoices/invoices-query.controller';
import { InvoicesCommandController } from '@/modules/superadmin/saas-billing/invoices/invoices-command.controller';
import { InvoicesListService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-list.service';
import { InvoicesFindService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-find.service';
import { InvoicesCreateService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-create.service';
import { InvoicesUpdateService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-update.service';
import { InvoicesDeleteService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-delete.service';
import { InvoicesStatusService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-status.service';
import { InvoicesManualPaymentService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-manual-payment.service';
import { InvoicesRecoveryCenterService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-recovery-center.service';
import { InvoicesResendService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-resend.service';
import { InvoicesExportService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-export.service';
import { InvoicesSpecialController } from '@/modules/superadmin/saas-billing/invoices/invoices-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([InvoicesContractSnapshotEntity, SaasInvoiceEntity])],
  controllers: [InvoicesQueryController, InvoicesCommandController, InvoicesSpecialController],
  providers: [InvoicesExportService, InvoicesContractSnapshotRepository, InvoicesManualPaymentService, InvoicesRecoveryCenterService, InvoicesResendService, InvoicesRepository, InvoicesListService, InvoicesFindService, InvoicesCreateService, InvoicesUpdateService, InvoicesDeleteService, InvoicesStatusService],
  exports: [InvoicesRepository],
})
export class InvoicesModule {}
