// RESPONSIBILITY: Owns reads and named persistence operations for invoices frontend contract snapshots.
// FLOW: Invoices service -> SuperadminInvoicesContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminInvoicesContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-contract-snapshot.entity';

@Injectable()
export class SuperadminInvoicesContractSnapshotRepository {
  constructor(@InjectRepository(SuperadminInvoicesContractSnapshotEntity) private readonly repository: Repository<SuperadminInvoicesContractSnapshotEntity>) {}


  /** Upserts a deterministic contract snapshot by its stable seed id and kind. */
  async upsertSnapshot(id: string, kind: string, payload: unknown): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as never });
    if (existing) {
      await this.repository.update({ id } as never, { kind, payload, deletedAt: null } as never);
      return;
    }
    await this.repository.insert(this.repository.create({ id, kind, payload } as {}) as any);
  }
}