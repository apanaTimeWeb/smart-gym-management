// RESPONSIBILITY: Registers the invoices feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminInvoicesRecoveryQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-recovery-query.controller';
import { SuperadminInvoicesRecoveryCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-recovery-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-query.controller';
import { SuperadminInvoicesCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-command.controller';
import { SuperadminInvoicesListService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-list.service';
import { SuperadminInvoicesFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-find.service';
import { SuperadminInvoicesCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-create.service';
import { SuperadminInvoicesUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-update.service';
import { SuperadminInvoicesDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-delete.service';
import { SuperadminInvoicesStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-status.service';
import { SuperadminInvoicesManualPaymentService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-manual-payment.service';
import { SuperadminInvoicesRecoveryCenterService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-recovery-center.service';
import { SuperadminInvoicesResendService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-resend.service';
import { SuperadminInvoicesExportService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-export.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminInvoicesEntity])],
  controllers: [SuperadminInvoicesQueryController, SuperadminInvoicesCommandController, SuperadminInvoicesRecoveryQueryController, SuperadminInvoicesRecoveryCommandController],
  providers: [SuperadminInvoicesExportService, SuperadminInvoicesManualPaymentService, SuperadminInvoicesRecoveryCenterService, SuperadminInvoicesResendService, SuperadminInvoicesRepository, SuperadminInvoicesListService, SuperadminInvoicesFindService, SuperadminInvoicesCreateService, SuperadminInvoicesUpdateService, SuperadminInvoicesDeleteService, SuperadminInvoicesStatusService],
  exports: [SuperadminInvoicesRepository],
})
export class SuperadminInvoicesModule {}