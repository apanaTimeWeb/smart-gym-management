// RESPONSIBILITY: Registers the invoices feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { InvoicesRecoveryQueryController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices-recovery-query.controller';
import { InvoicesRecoveryCommandController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices-recovery-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices.entity';
import { InvoicesRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesQueryController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices-query.controller';
import { InvoicesCommandController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices-command.controller';
import { InvoicesListService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-list.service';
import { InvoicesFindService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-find.service';
import { InvoicesCreateService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-create.service';
import { InvoicesUpdateService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-update.service';
import { InvoicesDeleteService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-delete.service';
import { InvoicesStatusService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-status.service';
import { InvoicesManualPaymentService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-manual-payment.service';
import { InvoicesRecoveryCenterService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-recovery-center.service';
import { InvoicesResendService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-resend.service';
import { InvoicesExportService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-export.service';
@Module({
  imports: [TypeOrmModule.forFeature([InvoicesEntity])],
  controllers: [InvoicesQueryController, InvoicesCommandController, InvoicesRecoveryQueryController, InvoicesRecoveryCommandController],
  providers: [InvoicesExportService, InvoicesManualPaymentService, InvoicesRecoveryCenterService, InvoicesResendService, InvoicesRepository, InvoicesListService, InvoicesFindService, InvoicesCreateService, InvoicesUpdateService, InvoicesDeleteService, InvoicesStatusService],
  exports: [InvoicesRepository],
})
export class InvoicesModule {}