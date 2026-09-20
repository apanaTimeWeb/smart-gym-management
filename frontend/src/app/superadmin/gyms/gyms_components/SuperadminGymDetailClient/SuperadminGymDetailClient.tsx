// RESPONSIBILITY: Renders the legacy Superadmin gym profile/detail surface from the feature-owned query hook. No API calls.
'use client';
import { useState } from 'react';
import { ArrowLeft, Activity, Clock, CreditCard, MapPin, User, Building2, Ticket, Palette, Save, Upload, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency, formatDate, displayValue } from '@/lib/formatters';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminGymDetail } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetail';
import type { SuperadminGymDetailClientProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailClientTypes';
import SuperadminGymDetailRow from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow';
import { getSuperadminGymStatusBadgeClasses } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsConstants';
import Link from 'next/link';

export default function SuperadminGymDetailClient({ gymId }: SuperadminGymDetailClientProps) {
  const router = useRouter();
  const query = useSuperadminGymDetail(gymId);
  const gym = query.data?.data;
  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'lifecycle' | 'whitelabel'>('overview');

  if (query.isPending) {
    return (
      <div className="space-y-6" aria-busy="true">
        <div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-32 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
        </div>
        <div className="h-64 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      </div>
    );
  }

  if (query.isError || !gym) {
    return (
      <div className="rounded-xl border border-danger/30 bg-danger-bg p-8 text-center" role="alert">
        <p className="mb-4 font-medium text-danger">Failed to load gym details.</p>
        <button type="button" onClick={() => void query.refetch()} className="rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6" aria-labelledby="superadmin-gym-detail-title">
      <button type="button" onClick={() => router.push(GymsUrlConfig.PAGES.MAIN)} className="flex items-center gap-2 text-sm text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">
        <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" /> Back to Gyms
      </button>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="min-w-0">
          <h1 id="superadmin-gym-detail-title" className="truncate text-2xl font-bold text-primary">{displayValue(gym.name)}</h1>
          <p className="mt-1 text-sm text-secondary">Gym ID: {displayValue(gym.gymId)}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-hover text-primary font-medium text-sm transition-colors shadow-sm">
            Ghost Login (Impersonate)
          </button>
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${getSuperadminGymStatusBadgeClasses(gym.status as any)}`}>
            {displayValue(gym.status)}
          </span>
        </div>
      </div>

      <div className="flex w-full overflow-x-auto border-b border-border hide-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'branches', label: 'Branches & Franchises' },
          { id: 'lifecycle', label: 'Lifecycle & Billing' },
          { id: 'whitelabel', label: 'White-labeling' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-surface-hover ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary hover:border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-lg bg-primary-subtle p-3 text-primary"><User size={18} strokeWidth={2} aria-hidden="true" /></div>
              <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-secondary">Members</p><p className="text-2xl font-bold text-primary">{gym.memberCount}</p></div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-lg bg-success-bg p-3 text-success"><CreditCard size={18} strokeWidth={2} aria-hidden="true" /></div>
              <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-secondary">Monthly Revenue</p><p className="truncate text-2xl font-bold text-primary">{formatCurrency(gym.monthlyRevenue ?? 0)}</p></div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-lg bg-purple-bg p-3 text-purple-text"><Activity size={18} strokeWidth={2} aria-hidden="true" /></div>
              <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-secondary">Plan</p><p className="truncate text-2xl font-bold text-primary">{displayValue(gym.plan)?.toUpperCase()}</p></div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-lg bg-warning-bg p-3 text-warning"><Clock size={18} strokeWidth={2} aria-hidden="true" /></div>
              <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-secondary">DB Version</p><p className="truncate text-lg font-bold text-primary">{displayValue(gym.databaseVersion)}</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-primary"><User size={18} strokeWidth={2} aria-hidden="true" /> Owner &amp; Contact</h2>
              <div className="space-y-3 text-sm">
                <SuperadminGymDetailRow label="Owner" value={gym.ownerName} />
                <SuperadminGymDetailRow label="Email" value={gym.adminEmail} />
                <SuperadminGymDetailRow label="Phone" value={gym.phone} />
                <SuperadminGymDetailRow label="Onboarded" value={gym.createdAt ? formatDate(gym.createdAt) : null} />
                <SuperadminGymDetailRow label="Last Login" value={gym.lastLoginAt ? formatDate(gym.lastLoginAt) : null} />
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-primary"><MapPin size={18} strokeWidth={2} aria-hidden="true" /> Location &amp; Legal</h2>
              <div className="space-y-3 text-sm">
                <SuperadminGymDetailRow label="City" value={gym.city} />
                <SuperadminGymDetailRow label="State" value={gym.state} />
                <SuperadminGymDetailRow label="Country" value={gym.country} />
                <SuperadminGymDetailRow label="GSTIN" value={gym.gstin} emphasis={!gym.gstin} />
                {gym.status === 'TRIAL' && gym.trialEndsAt ? <SuperadminGymDetailRow label="Trial Ends" value={formatDate(gym.trialEndsAt)} emphasisWarning /> : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'branches' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <Building2 size={48} className="mx-auto mb-4 text-secondary/30" />
            <h2 className="text-xl font-bold text-primary mb-2">Branch & Franchise Overview</h2>
            <p className="text-secondary max-w-md mx-auto">
              Branch and franchise management is handled exclusively by the Gym Admin portal. 
              As Superadmin, you have read-only visibility into this tenant&apos;s physical locations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Branches', value: '—', icon: <Building2 size={20} />, note: 'Synced from Admin portal' },
              { label: 'Franchise Partners', value: '—', icon: <Ticket size={20} />, note: 'Read-only for Superadmin' },
              { label: 'Active Locations', value: '—', icon: <MapPin size={20} />, note: 'Contact gym admin to modify' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
                <div className="rounded-lg bg-primary-subtle p-3 text-primary">{stat.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-secondary">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-disabled mt-0.5">{stat.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'lifecycle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2"><CreditCard size={20}/> Current SaaS Plan</h2>
            <div className="p-5 bg-surface rounded-lg border border-border space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-subtle rounded-bl-full -z-10" />
              <p className="text-sm text-secondary">Active Plan</p>
              <p className="text-3xl font-bold text-primary">{displayValue(gym.plan)?.toUpperCase()}</p>
              <p className="text-sm text-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success inline-block"></span> Active Subscription
              </p>
            </div>
            <Link href="/superadmin/saas-billing" className="block text-center px-4 py-2.5 rounded-lg border border-border text-primary hover:bg-surface-hover transition-colors font-medium">Manage Billing & Plans</Link>
          </div>
          
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2"><Ticket size={20}/> Onboarding Status</h2>
            <ul className="space-y-4">
               <li className="flex items-center justify-between text-sm p-3 bg-surface rounded-lg border border-border">
                 <span className="text-primary font-medium">Account Created</span> 
                 <span className="text-success font-semibold px-2 py-1 bg-success-bg rounded text-xs">Complete</span>
               </li>
               <li className="flex items-center justify-between text-sm p-3 bg-surface rounded-lg border border-border">
                 <span className="text-primary font-medium">Billing Configured</span> 
                 <span className="text-success font-semibold px-2 py-1 bg-success-bg rounded text-xs">Complete</span>
               </li>
               <li className="flex items-center justify-between text-sm p-3 bg-surface rounded-lg border border-border border-dashed">
                 <span className="text-primary font-medium">First Branch Added</span> 
                 <span className="text-warning font-semibold px-2 py-1 bg-warning-bg rounded text-xs">Pending</span>
               </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'whitelabel' && (
        <div className="rounded-xl border border-border bg-card p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm">
           <div className="border-b border-border pb-6">
             <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-2"><Palette size={22}/> Brand Identity</h2>
             <p className="text-sm text-secondary">Override the default Smart Gym styling for this tenant to provide a white-labeled experience.</p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <div className="space-y-4">
               <label className="block text-sm font-semibold text-primary">Custom Logo</label>
               <div className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-surface hover:bg-surface-hover hover:border-primary/50 transition-colors cursor-pointer group">
                 <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                   <Upload size={24} className="text-primary" />
                 </div>
                 <p className="text-sm text-primary font-medium mb-1">Click to upload logo</p>
                 <p className="text-xs text-secondary">SVG, PNG, or JPG (max 2MB)</p>
               </div>
             </div>

             <div className="space-y-6">
               <div>
                 <label className="block text-sm font-semibold text-primary mb-2">Primary Brand Color</label>
                 <div className="flex items-center gap-3">
                   <input type="color" defaultValue="#6366f1" className="h-12 w-12 rounded-lg border border-border cursor-pointer overflow-hidden p-0" />
                   <input type="text" defaultValue="#6366f1" className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-semibold text-primary mb-2">Secondary Brand Color</label>
                 <div className="flex items-center gap-3">
                   <input type="color" defaultValue="#4f46e5" className="h-12 w-12 rounded-lg border border-border cursor-pointer overflow-hidden p-0" />
                   <input type="text" defaultValue="#4f46e5" className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono" />
                 </div>
               </div>
             </div>
           </div>

           <div className="pt-6 border-t border-border">
             <div className="space-y-4 max-w-2xl">
               <h2 className="text-lg font-bold text-primary flex items-center gap-2"><LinkIcon size={20}/> Custom Domain Config</h2>
               <p className="text-sm text-secondary mb-2">Allow this gym to access their portal via their own domain.</p>
               <div className="flex">
                 <span className="inline-flex items-center rounded-l-lg border border-r-0 border-border bg-surface px-4 text-sm text-secondary font-medium">https://</span>
                 <input type="text" placeholder="app.theirgym.com" className="flex-1 rounded-r-lg border border-border bg-page px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
               </div>
             </div>
           </div>

           <div className="flex justify-end pt-6 border-t border-border">
             <button type="button" className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-hover transition-all shadow-md shadow-primary/20 active:scale-95">
               <Save size={18} />
               Save White-label Settings
             </button>
           </div>
        </div>
      )}
    </section>
  );
}
