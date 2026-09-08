// RESPONSIBILITY: Server Component entry point for /manager/profile. Rule 8 compliant — no 'use client'.
import type { Metadata } from 'next';
import ManagerProfileMain from '@/app/manager/profile/profile_components/ManagerProfileMain/ManagerProfileMain';

export const metadata: Metadata = { title: 'My Profile | Manager | GymSmart' };

export default function ManagerProfilePage() {
  return <ManagerProfileMain />;
}
