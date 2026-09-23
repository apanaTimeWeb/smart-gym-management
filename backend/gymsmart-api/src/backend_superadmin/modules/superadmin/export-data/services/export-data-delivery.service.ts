// RESPONSIBILITY: Applies the export proof-of-delivery medium contract and performs configured fallback routing.
// FLOW: Export worker -> requested medium -> fallback medium on failure -> delivery result.
import { Injectable } from '@nestjs/common';
import { ExportDataDeliveryMedium } from '@/backend_superadmin/modules/superadmin/export-data/dtos/export-data-request.dto';
import { ExportDataEmailAdapter } from '@/backend_superadmin/modules/superadmin/export-data/adapters/export-data-email.adapter';
import { ExportDataWhatsappAdapter } from '@/backend_superadmin/modules/superadmin/export-data/adapters/export-data-whatsapp.adapter';
import { ExportDeliveryRecipientMissingException } from '@/backend_superadmin/modules/superadmin/export-data/export-data.exceptions';

export interface ExportDataDeliveryTarget { email: string | null; phone: string | null; medium: ExportDataDeliveryMedium; }

@Injectable()
export class ExportDataDeliveryService {
  constructor(private readonly email: ExportDataEmailAdapter, private readonly whatsapp: ExportDataWhatsappAdapter) {}

  /** Delivers the export using the requested medium and a configured alternate medium when possible. */
  async deliver(target: ExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (target.medium === ExportDataDeliveryMedium.WHATSAPP) return this.deliverWhatsappFirst(target, downloadUrl, expiresAt);
    return this.deliverEmailFirst(target, downloadUrl, expiresAt);
  }

  /** Uses WhatsApp first and Email as the mandatory fallback. */
  private async deliverWhatsappFirst(target: ExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (!target.phone || !this.whatsapp.isConfigured()) return this.deliverEmail(target, downloadUrl, expiresAt);
    try { await this.whatsapp.send(target.phone, downloadUrl, expiresAt); return ExportDataDeliveryMedium.WHATSAPP; }
    catch { return this.deliverEmail(target, downloadUrl, expiresAt); }
  }

  /** Uses Email first and WhatsApp as the configured alternate when available. */
  private async deliverEmailFirst(target: ExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    try { return await this.deliverEmail(target, downloadUrl, expiresAt); }
    catch (error) {
      if (!target.phone || !this.whatsapp.isConfigured()) throw error;
      await this.whatsapp.send(target.phone, downloadUrl, expiresAt);
      return ExportDataDeliveryMedium.WHATSAPP;
    }
  }

  /** Delivers the mandatory default/fallback Email medium. */
  private async deliverEmail(target: ExportDataDeliveryTarget, downloadUrl: string, expiresAt: string): Promise<ExportDataDeliveryMedium> {
    if (!target.email) throw new ExportDeliveryRecipientMissingException();
    await this.email.send(target.email, downloadUrl, expiresAt);
    return ExportDataDeliveryMedium.EMAIL;
  }
}
