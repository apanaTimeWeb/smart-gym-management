// RESPONSIBILITY: Registers the invoices feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSaasBillingInvoicesRecoveryQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-recovery-query.controller';
import { SuperadminSaasBillingInvoicesRecoveryCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-recovery-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSaasBillingInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import { SuperadminSaasBillingInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminSaasBillingInvoicesQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-query.controller';
import { SuperadminSaasBillingInvoicesCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-command.controller';
import { SuperadminSaasBillingInvoicesListService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-list.service';
import { SuperadminSaasBillingInvoicesFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-find.service';
import { SuperadminSaasBillingInvoicesCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-create.service';
import { SuperadminSaasBillingInvoicesUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-update.service';
import { SuperadminSaasBillingInvoicesDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-delete.service';
import { SuperadminSaasBillingInvoicesStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-status.service';
import { SuperadminSaasBillingInvoicesManualPaymentService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-manual-payment.service';
import { SuperadminSaasBillingInvoicesRecoveryCenterService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-recovery-center.service';
import { SuperadminSaasBillingInvoicesResendService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-resend.service';
import { SuperadminSaasBillingInvoicesResendJobEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-resend-job.entity';
import { SuperadminSaasBillingInvoicesResendJobRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository';
import { SuperadminSaasBillingInvoicesEmailAdapter } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_adapters/superadmin-saas-billing-invoices-email.adapter';
import { SuperadminSaasBillingInvoicesResendWorkerService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_workers/superadmin-saas-billing-invoices-resend-worker.service';
import { SuperadminSaasBillingInvoicesExportService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-export.service';
import { SuperadminSaasBillingInvoicesLedgerEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-ledger.entity';
import { SuperadminSaasBillingInvoicesLedgerRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-ledger.repository';
import { SuperadminSaasBillingInvoicesManualPaymentOrchestratorService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-manual-payment-orchestrator.service';
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSaasBillingInvoicesEntity, SuperadminSaasBillingInvoicesResendJobEntity, SuperadminSaasBillingInvoicesLedgerEntity])],
  controllers: [SuperadminSaasBillingInvoicesQueryController, SuperadminSaasBillingInvoicesCommandController, SuperadminSaasBillingInvoicesRecoveryQueryController, SuperadminSaasBillingInvoicesRecoveryCommandController],
  providers: [SuperadminSaasBillingInvoicesExportService, SuperadminSaasBillingInvoicesManualPaymentService, SuperadminSaasBillingInvoicesManualPaymentOrchestratorService, SuperadminSaasBillingInvoicesLedgerRepository, SuperadminSaasBillingInvoicesRecoveryCenterService, SuperadminSaasBillingInvoicesResendService, SuperadminSaasBillingInvoicesResendJobRepository, SuperadminSaasBillingInvoicesEmailAdapter, SuperadminSaasBillingInvoicesResendWorkerService, SuperadminSaasBillingInvoicesRepository, SuperadminSaasBillingInvoicesListService, SuperadminSaasBillingInvoicesFindService, SuperadminSaasBillingInvoicesCreateService, SuperadminSaasBillingInvoicesUpdateService, SuperadminSaasBillingInvoicesDeleteService, SuperadminSaasBillingInvoicesStatusService],
  exports: [SuperadminSaasBillingInvoicesRepository],
})
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSaasBillingInvoicesModule {}
