// RESPONSIBILITY: Applies the export proof-of-delivery medium contract and performs configured fallback routing.
// FLOW: Export worker -> requested medium -> fallback medium on failure -> delivery result.
import { Injectable } from '@nestjs/common';
import { ExportDataDeliveryMedium } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-request.constants';
import { SuperadminExportDataEmailAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-email.adapter';
import { SuperadminExportDataWhatsappAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-whatsapp.adapter';
import { SuperadminExportDeliveryRecipientMissingException } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.exceptions';

/**
 * Primary Intent: Defines SuperadminExportDataDeliveryTarget as the interface-level contract for superadmin-export-data-delivery.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminExportDataDeliveryTarget { email: string | null; phone: string | null; medium: ExportDataDeliveryMedium; }

/**
 * Primary Intent: Defines SuperadminExportDataDeliveryService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataDeliveryService {
  constructor(private readonly email: SuperadminExportDataEmailAdapter, private readonly whatsapp: SuperadminExportDataWhatsappAdapter) {}
/**
 * Primary Intent: Executes the deliver use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the deliver use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deliver(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (target.medium === ExportDataDeliveryMedium.WHATSAPP) return this.deliverWhatsappFirst(target, downloadUrl, expiresAt);
    return this.deliverEmailFirst(target, downloadUrl, expiresAt);
  }

  /**
 * Primary Intent: Executes the `deliverWhatsappFirst` responsibility owned by this feature-local superadmin-export-data-delivery.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the deliverWhatsappFirst use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async deliverWhatsappFirst(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (!target.phone || !this.whatsapp.isConfigured()) return this.deliverEmail(target, downloadUrl, expiresAt);
    try { await this.whatsapp.send(target.phone, downloadUrl, expiresAt); return ExportDataDeliveryMedium.WHATSAPP; }
    catch { return this.deliverEmail(target, downloadUrl, expiresAt); }
  }

  /**
 * Primary Intent: Executes the `deliverEmailFirst` responsibility owned by this superadmin-export-data-delivery.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the deliverEmailFirst use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async deliverEmailFirst(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    try { return await this.deliverEmail(target, downloadUrl, expiresAt); }
    /**
     * Primary Intent: Executes the catch use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    catch (error) {
      if (!target.phone || !this.whatsapp.isConfigured()) throw error;
      await this.whatsapp.send(target.phone, downloadUrl, expiresAt);
      return ExportDataDeliveryMedium.WHATSAPP;
    }
  }

  /**
 * Primary Intent: Executes the `deliverEmail` responsibility owned by this superadmin-export-data-delivery.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the deliverEmail use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async deliverEmail(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (!target.email) throw new SuperadminExportDeliveryRecipientMissingException();
    await this.email.send(target.email, downloadUrl, expiresAt);
    return ExportDataDeliveryMedium.EMAIL;
  }
}
