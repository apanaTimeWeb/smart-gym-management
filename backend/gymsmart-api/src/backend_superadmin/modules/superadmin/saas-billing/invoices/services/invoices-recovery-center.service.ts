// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> InvoicesRecoveryCenterService -> InvoicesContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { InvoicesRecoveryCenterResponseDto } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices-recovery-center-response.dto';
import { InvoicesContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices-contract-snapshot.repository';
import { INVOICES_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.constants';

@Injectable()
export class InvoicesRecoveryCenterService {
  constructor(private readonly repository: InvoicesContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findInvoicesRecoveryCenter(input: Record<string, unknown> = {}): Promise<InvoicesRecoveryCenterResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(INVOICES_SNAPSHOT_KINDS.RECOVERY_CENTER);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as InvoicesRecoveryCenterResponseDto;
  }
}
