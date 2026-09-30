// RESPONSIBILITY: Renders the mobile-only Login brand header without authentication or navigation logic.
'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AuthLoginSharedConstants } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginSharedConstants';
/**
 * Renders the mobile-only Login product header.
 * @description Contains no authentication or navigation business logic.
 * @dependencies next/image, next-intl, AuthLoginSharedConstants.
 */
export default function AuthLoginMobileHeader() {
  const t = useTranslations('AUTH_LOGIN');

  return (
    <div className="absolute left-6 top-6 flex items-center gap-3 lg:hidden">
      <div className="h-10 w-10 overflow-hidden rounded-md border border-border bg-card">
        <Image src={AuthLoginSharedConstants.ASSETS.LOGO} alt={t('BRAND')} width={40} height={40} className="h-full w-full object-cover" />
      </div>
      <h2 className="text-xl font-bold text-primary">{t('BRAND')}</h2>
    </div>
  );
}
