/**
 * RESPONSIBILITY: Owns Login-only static presentation configuration, assets, labels, demo-role metadata, and validation limits.
 * DATA FLOW: Login components/schema -> AuthLoginSharedConstants -> stable UI/configuration behavior.
 * @edge-case Demo-role metadata contains no demo credentials; credentials remain server-only in AuthMockFixtures.
 */
import { TrendingUp, Users, Zap } from 'lucide-react';
import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import type { LucideIcon } from 'lucide-react';

export const AuthLoginSharedConstants = {
  ASSETS: {
    LOGO: '/logo.png',
    HERO_IMAGE: '/gym-hero.jpg',
  },
  PASSWORD_MIN_LENGTH: 6,
  HERO_ICONS: [TrendingUp, Users, Zap] as const satisfies readonly LucideIcon[],
  HERO_STATS: [
    { value: '500+', labelKey: 'HERO_STATS.GYMS_MANAGED' },
    { value: '2L+', labelKey: 'HERO_STATS.ACTIVE_MEMBERS' },
    { value: '99.9%', labelKey: 'HERO_STATS.UPTIME_SLA' },
  ],
  HERO_FEATURE_KEYS: [
    'HERO_FEATURES.MEMBERS_PLANS',
    'HERO_FEATURES.ATTENDANCE_BIOMETRIC',
    'HERO_FEATURES.FINANCE_HR_PAYROLL',
    'HERO_FEATURES.WHATSAPP_EMAIL',
  ],
  DEMO_BUTTONS: [
    { role: AuthRoleConstants.SUPERADMIN, labelKey: 'DEMO.SUPERADMIN' },
    { role: AuthRoleConstants.ADMIN, labelKey: 'DEMO.ADMIN' },
    { role: AuthRoleConstants.MANAGER, labelKey: 'DEMO.MANAGER' },
    { role: AuthRoleConstants.TRAINER, labelKey: 'DEMO.TRAINER' },
  ],
} as const;

export type AuthLoginDemoRole = (typeof AuthLoginSharedConstants.DEMO_BUTTONS)[number]['role'];
