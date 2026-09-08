// RESPONSIBILITY: Server Component entry point for /admin/profile. Rule 8 compliant — no 'use client'.
import type { Metadata } from 'next';
import AdminProfileMain from '@/app/admin/profile/profile_components/AdminProfileMain/AdminProfileMain';

export const metadata: Metadata = { title: 'My Profile | Admin | GymSmart' };

export default function AdminProfilePage() {
  return <AdminProfileMain />;
}
