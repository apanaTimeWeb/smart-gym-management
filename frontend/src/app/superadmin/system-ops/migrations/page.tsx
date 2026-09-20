// RESPONSIBILITY: Server component entry point for the Superadmin Migrations module.
import { Suspense } from 'react';
import type { Metadata } from 'next';
import SuperadminMigrationsClient from '@/app/superadmin/system-ops/migrations/migrations_components/SuperadminMigrationsClient';
export const metadata: Metadata = {
    title: 'Schema Rollouts | Superadmin Dashboard',
    description: 'Manage and track database schema migrations across all gym instances.',
};
export default function SuperadminMigrationsPage() {
    return (<main className="w-full h-full bg-page min-h-screen">
      <SuperadminMigrationsClient />
    </main>);
}
