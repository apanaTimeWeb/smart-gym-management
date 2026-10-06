// RESPONSIBILITY: Loads the build-time merged Admin locale bundles while keeping locale source files owned by their feature modules.

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import type { AdminLayoutI18nProviderProps } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

const SUPPORTED_LOCALES = new Set(["en", "hi"]);

/**
 * AdminLayoutI18nProvider loads merged Admin locale bundles for the authenticated application shell.
 * @dependencies Uses next-intl server locale resolution and build-generated public locale files.
 * @edge-case Falls back to English for unsupported locales; missing bundles remain an explicit integration failure.
 */
export default async function AdminLayoutI18nProvider({ children }: AdminLayoutI18nProviderProps) {
  const resolvedLocale = await getLocale();
  const locale = SUPPORTED_LOCALES.has(resolvedLocale) ? resolvedLocale : "en";
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
