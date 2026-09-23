// RESPONSIBILITY: Builds live invoice-recovery telemetry from persisted invoice state.
// FLOW: InvoicesRecoveryQueryController -> InvoicesRecoveryCenterService -> InvoicesRepository -> saas invoices.
import { Injectable } from '@nestjs/common';
import { InvoicesRecoveryCenterResponseDto } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices-recovery-center-response.dto';
import { InvoicesRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices.repository';

@Injectable()
export class InvoicesRecoveryCenterService {
  constructor(private readonly repository: InvoicesRepository) {}

  /** Returns current recovery state from active invoices, never from demo snapshots. */
  async findInvoicesRecoveryCenter(_input: Record<string, unknown> = {}): Promise<InvoicesRecoveryCenterResponseDto> {
    const result = await this.repository.getRecoveryCenter(_input);
    return { currency: result.currency, summary: result.summary, recovery: result.recovery, reconciliation: result.reconciliation, policy: result.policy };
  }
}
