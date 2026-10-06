// RESPONSIBILITY: Root layout for the ADMIN role container. The consuming application owns the canonical QueryClientProvider; this role container must not create a second server-state cache boundary.
import React from 'react';
import { Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import AdminLayoutI18nProvider from '@/app/frontend_admin/admin_layout/admin_layout_i18n/AdminLayoutI18nProvider';
import AdminLayout from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayout';
import { AdminLayoutConfirmProvider } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutConfirmProvider';
import { AdminLayoutToastProvider } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastProvider';
import AdminLayoutDialogAccessibilityProvider from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutDialogAccessibilityProvider';
import AdminLayoutToastBridge from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastBridge';
import AdminLayoutWebSocketProvider from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutWebSocketProvider';
import type { AdminRootLayoutProps } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_layout.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

/**
 * ADMINLayout is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function ADMINLayout({ children }: AdminRootLayoutProps) {
  return (
    <div className={inter.className}>
      <AdminLayoutI18nProvider>
        <AdminLayoutWebSocketProvider>
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <AdminLayoutConfirmProvider>
            <AdminLayoutToastProvider />
            <AdminLayoutDialogAccessibilityProvider />
            <AdminLayoutToastBridge />
            <AdminLayout>{children}</AdminLayout>
          </AdminLayoutConfirmProvider>
        </AdminLayoutWebSocketProvider>
      </AdminLayoutI18nProvider>
    </div>
  );
}
