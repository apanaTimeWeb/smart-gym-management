// RESPONSIBILITY: Builds feature-owned contact links for the Admin Settings banner.
import { ADMIN_SETTINGS_EXTERNAL_URLS } from '@/app/frontend_admin/admin_settings/admin_settings_url_config';

export function buildAdminSettingsWhatsAppWebUrl(phone: string): string {
  return `${ADMIN_SETTINGS_EXTERNAL_URLS.whatsappWeb}/${phone.replace(/[^0-9]/g, '')}`;
}

export function buildAdminSettingsPhoneUrl(phone: string): string {
  return `${ADMIN_SETTINGS_EXTERNAL_URLS.telephone}${phone.replace(/[^0-9+]/g, '')}`;
}
