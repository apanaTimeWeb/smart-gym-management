// RESPONSIBILITY: Applies the export proof-of-delivery medium contract and performs configured fallback routing.
// FLOW: Export worker -> requested medium -> fallback medium on failure -> delivery result.
import { Injectable } from '@nestjs/common';
import { ExportDataDeliveryMedium } from '@/backend_superadmin/superadmin_modules/export-data/dtos/superadmin-export-data-request.dto';
import { SuperadminExportDataEmailAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-email.adapter';
import { SuperadminExportDataWhatsappAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-whatsapp.adapter';
import { SuperadminExportDeliveryRecipientMissingException } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.exceptions';

export interface SuperadminExportDataDeliveryTarget { email: string | null; phone: string | null; medium: ExportDataDeliveryMedium; }

@Injectable()
export class SuperadminExportDataDeliveryService {
  constructor(private readonly email: SuperadminExportDataEmailAdapter, private readonly whatsapp: SuperadminExportDataWhatsappAdapter) {}

  /** Delivers the export using the requested medium and a configured alternate medium when possible. */
  async deliver(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (target.medium === ExportDataDeliveryMedium.WHATSAPP) return this.deliverWhatsappFirst(target, downloadUrl, expiresAt);
    return this.deliverEmailFirst(target, downloadUrl, expiresAt);
  }

  /** Uses WhatsApp first and Email as the mandatory fallback. */
  private async deliverWhatsappFirst(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (!target.phone || !this.whatsapp.isConfigured()) return this.deliverEmail(target, downloadUrl, expiresAt);
    try { await this.whatsapp.send(target.phone, downloadUrl, expiresAt); return ExportDataDeliveryMedium.WHATSAPP; }
    catch { return this.deliverEmail(target, downloadUrl, expiresAt); }
  }

  /** Uses Email first and WhatsApp as the configured alternate when available. */
  private async deliverEmailFirst(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    try { return await this.deliverEmail(target, downloadUrl, expiresAt); }
    catch (error) {
      if (!target.phone || !this.whatsapp.isConfigured()) throw error;
      await this.whatsapp.send(target.phone, downloadUrl, expiresAt);
      return ExportDataDeliveryMedium.WHATSAPP;
    }
  }

  /** Delivers the mandatory default/fallback Email medium. */
  private async deliverEmail(target: SuperadminExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (!target.email) throw new SuperadminExportDeliveryRecipientMissingException();
    await this.email.send(target.email, downloadUrl, expiresAt);
    return ExportDataDeliveryMedium.EMAIL;
  }
}
