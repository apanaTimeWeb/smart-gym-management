// RESPONSIBILITY: Root orchestrator for the Gyms page. Renders the layout, toolbar, and table.
'use client';
import { useState } from 'react';
import '@/app/superadmin/gyms/SuperadminGyms.css';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import SuperadminGymsToolbar from '@/app/superadmin/gyms/gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar';
import SuperadminGymsTable from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/SuperadminGymsTable';
import SuperadminGymsCalendar from '@/app/superadmin/gyms/gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';
export default function SuperadminGymsClient() {
    const viewMode = useSuperadminGymsStore(state => state.viewMode);
    const [statusFilter, setStatusFilter] = useState('All');
    
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Gyms</h1>
          <p className="text-secondary mt-1">Manage your SaaS clients, subscriptions, and access.</p>
        </div>
        <Link href={GymsUrlConfig.PAGES.ADD} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg font-medium motion-safe:transition-colors shadow-card shadow-primary/20">
          <Plus size={18}/>
          Onboard New Gym
        </Link>
      </div>

      <div className="flex w-full overflow-x-auto border-b border-border hide-scrollbar">
        {['All', 'Onboarding', 'Active', 'Churn Risk', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-surface-hover ${
              statusFilter === status
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary hover:border-border'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-page border border-border rounded-xl overflow-hidden shadow-card">
        <SuperadminGymsToolbar />
        <SuperadminErrorBoundary variant="inline">
          {viewMode === 'calendar' ? <SuperadminGymsCalendar /> : <SuperadminGymsTable />}
        </SuperadminErrorBoundary>
      </div>
    </div>);
}
