// RESPONSIBILITY: Server Component entry point for /manager/settings. Rule 8 compliant — no 'use client'.
import type { Metadata } from 'next';
import ManagerSettingsMain from '@/app/manager/settings/settings_components/ManagerSettingsMain/ManagerSettingsMain';

export const metadata: Metadata = { title: 'Settings | Manager | GymSmart' };

export default function ManagerSettingsPage() {
  return <ManagerSettingsMain />;
}
