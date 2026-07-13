import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { GymsProvider } from '@/app/superadmin/gyms/gyms_context/GymsContext';
import GymsToolbar from '@/app/superadmin/gyms/gyms_components/GymsToolbar';
import GymsTable from '@/app/superadmin/gyms/gyms_components/GymsTable';
import './gyms.css';

export default function GymsList() {
  return (
    <GymsProvider>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tenants (Gyms)</h1>
            <p className="text-secondary mt-1">Manage your SaaS clients, subscriptions, and access.</p>
          </div>
          <Link 
            href={SuperadminUrlConfig.PAGES.GYM_ADD}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
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
    </GymsProvider>
  );
}


