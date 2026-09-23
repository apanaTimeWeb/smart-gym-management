// RESPONSIBILITY: Creates secure invoice download/export contracts backed by live invoice rows.
// FLOW: Controller -> SuperadminInvoicesExportService -> SuperadminInvoicesRepository -> signed resource URL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
@Injectable()
export class SuperadminInvoicesExportService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Returns a short-lived invoice file URL after verifying the invoice exists. */
  async findDownload(id: string): Promise<{ downloadUrl: string }> { await this.repository.findByIdOrThrow(id); return { downloadUrl: `/api/v1/superadmin/saas-billing/invoices/${encodeURIComponent(id)}/download/file` }; }
  /** Returns a live export URL scoped to optional invoice filters. */
  async export(tenantId?: string, status?: string): Promise<{ downloadUrl: string }> { const query = new URLSearchParams(); if (tenantId) query.set('tenantId', tenantId); if (status) query.set('status', status); const suffix = query.toString() ? `?${query.toString()}` : ''; return { downloadUrl: `/api/v1/superadmin/saas-billing/invoices/export/file${suffix}` }; }
}