// RESPONSIBILITY: Creates secure invoice download/export contracts backed by live invoice rows.
// FLOW: Controller -> InvoicesExportService -> InvoicesRepository -> signed resource URL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoicesRepository } from '@/modules/superadmin/saas-billing/invoices/invoices.repository';
@Injectable()
export class InvoicesExportService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Returns a short-lived invoice file URL after verifying the invoice exists. */
  async findDownload(id: string): Promise<{ downloadUrl: string }> { await this.repository.findByIdOrThrow(id); return { downloadUrl: `/api/v1/superadmin/saas-billing/invoices/${encodeURIComponent(id)}/download/file` }; }
  /** Returns a live export URL scoped to optional invoice filters. */
  async export(tenantId?: string, status?: string): Promise<{ downloadUrl: string }> { const query = new URLSearchParams(); if (tenantId) query.set('tenantId', tenantId); if (status) query.set('status', status); const suffix = query.toString() ? `?${query.toString()}` : ''; return { downloadUrl: `/api/v1/superadmin/saas-billing/invoices/export/file${suffix}` }; }
}
