'use client';
// RESPONSIBILITY: Root orchestrator for the Gyms page. Renders the layout, toolbar, and table.
import '@/app/superadmin/gyms/gyms.css';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import GymsToolbar from '@/app/superadmin/gyms/gyms_components/GymsToolbar/GymsToolbar';
import GymsTable from '@/app/superadmin/gyms/gyms_components/GymsTable/GymsTable';


export default function GymsClient() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tenants (Gyms)</h1>
          <p className="text-secondary mt-1">Manage your SaaS clients, subscriptions, and access.</p>
        </div>
        <Link 
          href={SuperadminUrlConfig.PAGES.GYM_ADD}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium motion-safe:transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Onboard New Gym
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
        <GymsToolbar />
        <GymsTable />
      </div>
    </div>
  );
}
