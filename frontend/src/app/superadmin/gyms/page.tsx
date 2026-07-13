// RESPONSIBILITY: Server Component that acts as the entry point for the Tenants (Gyms) list page.
import { Metadata } from 'next';
import GymsClient from '@/app/superadmin/gyms/GymsClient';

export const metadata: Metadata = {
  title: 'Gyms | Superadmin',
  description: 'Manage SaaS clients and tenants.',
};

export default function GymsPage() {
  // In the future, server-side fetching can happen here before passing data to GymsClient
  return (
    <GymsClient />
  );
}

