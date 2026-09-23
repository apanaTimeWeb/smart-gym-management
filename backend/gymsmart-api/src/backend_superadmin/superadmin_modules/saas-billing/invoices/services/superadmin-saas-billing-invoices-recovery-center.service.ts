// RESPONSIBILITY: Builds live invoice-recovery telemetry from persisted invoice state.
// FLOW: SuperadminInvoicesRecoveryQueryController -> SuperadminInvoicesRecoveryCenterService -> SuperadminInvoicesRepository -> saas invoices.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRecoveryCenterResponseDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-recovery-center-response.dto';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';

@Injectable()
export class SuperadminInvoicesRecoveryCenterService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}

  /** Returns current recovery state from active invoices, never from demo snapshots. */
  async findInvoicesRecoveryCenter(_input: Record<string, unknown> = {}): Promise<SuperadminInvoicesRecoveryCenterResponseDto> {
    const result = await this.repository.getRecoveryCenter(_input);
    return { currency: result.currency, summary: result.summary, recovery: result.recovery, reconciliation: result.reconciliation, policy: result.policy };
  }
}
