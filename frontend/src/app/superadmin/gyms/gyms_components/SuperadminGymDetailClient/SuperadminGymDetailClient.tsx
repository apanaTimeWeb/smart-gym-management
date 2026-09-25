// RESPONSIBILITY: Renders the Superadmin Gym 360 detail workspace from query-owned data and feature-owned action hooks. No direct API calls.
'use client';


import { formatCurrency } from '@/app/superadmin/gyms/gyms_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { Activity, ArrowLeft, Building2, Clock, CreditCard, Link as LinkIcon, MapPin, Palette, Ticket, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate, formatNumber, displayValue } from '@/lib/formatters';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminGymDetail } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetail';
import { useSuperadminGymDetailActions } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetailActions';
import { getSuperadminGymStatusBadgeClasses } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsConstants';
import { SUPERADMIN_GYM_DETAIL_CLIENT_TABS, type SuperadminGymDetailClientProps, type SuperadminGymDetailClientTab } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailClientTypes';
import type { SuperadminGymDetailStatus } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailTypes';
import SuperadminGymDetailRow from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow';
import SuperadminGymDetailSkeleton from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton';

const SUPERADMIN_GYM_DETAIL_BILLING_ROUTE = GymsUrlConfig.PAGES.BILLING_PLANS;


export default function SuperadminGymDetailClient({ gymId }: SuperadminGymDetailClientProps) {
    const locale = useLocale();

  const router = useRouter();
  const query = useSuperadminGymDetail(gymId);
  const gym = query.data?.data;
  const { startGhostLogin, isStartingGhostLogin } = useSuperadminGymDetailActions();
  const [activeTab, setActiveTab] = useState<SuperadminGymDetailClientTab>('overview');

  if (query.isPending) return <SuperadminGymDetailSkeleton />;

  if (query.isError || !gym) {
    return (
      <section className="rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert">
        <p className="mb-4 font-medium text-danger">Failed to load gym details.</p>
        <button type="button" onClick={() => void query.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Retry</button>
      </section>
    );
  }

  const gymForGhostLogin = { id: gym.gymId, name: gym.gymName, plan: gym.plan, adminEmail: gym.adminEmail };
  const status = gym.status as SuperadminGymDetailStatus;

  return (
    <section className="space-y-6" aria-labelledby="superadmin-gym-detail-title">
      <button type="button" onClick={() => router.push(GymsUrlConfig.PAGES.MAIN)} className="flex min-h-11 items-center gap-2 text-sm text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        <ArrowLeft size={18} aria-hidden="true"/> Back to Gyms
      </button>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="min-w-0">
          <h1 id="superadmin-gym-detail-title" className="truncate text-2xl font-bold text-primary" title={gym.gymName}>{displayValue(gym.gymName)}</h1>
          <p className="mt-1 text-sm text-secondary">Gym ID: {displayValue(gym.gymId)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => startGhostLogin(gymForGhostLogin)} disabled={isStartingGhostLogin} className="min-h-11 rounded-lg border border-border bg-input px-4 py-2 text-sm font-medium text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50">
            {isStartingGhostLogin ? 'Opening Admin…' : 'Ghost Login (Impersonate)'}
          </button>
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${getSuperadminGymStatusBadgeClasses(status as any)}`}>{displayValue(status)}</span>
        </div>
      </div>

      <nav className="flex w-full overflow-x-auto border-b border-border" aria-label="Gym detail sections">
        {SUPERADMIN_GYM_DETAIL_CLIENT_TABS.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-current={activeTab === tab.id ? 'page' : undefined} className={`min-h-11 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-secondary hover:border-border hover:text-primary'}`}>
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Members', value: formatNumber(gym.memberCount), icon: User, tone: 'bg-primary-subtle text-primary' },
              { label: 'Monthly Revenue', value: formatCurrency(gym.monthlyRevenue, gym.currency, locale), icon: CreditCard, tone: 'bg-success-bg text-success' },
              { label: 'Plan', value: displayValue(gym.plan).toUpperCase(), icon: Activity, tone: 'bg-purple-bg text-purple-text' },
              { label: 'DB Version', value: displayValue(gym.databaseVersion), icon: Clock, tone: 'bg-warning-bg text-warning' },
            ].map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                <div className={`rounded-lg p-3 ${tone}`}><Icon size={18} aria-hidden="true" /></div>
                <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-secondary">{label}</p><p className="truncate text-2xl font-bold text-primary">{value}</p></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-primary"><User size={18} aria-hidden="true"/> Owner &amp; Contact</h2>
              <div className="space-y-3 text-sm">
                <SuperadminGymDetailRow label="Owner" value={gym.ownerName} />
                <SuperadminGymDetailRow label="Email" value={gym.adminEmail} />
                <SuperadminGymDetailRow label="Phone" value={gym.phone} />
                <SuperadminGymDetailRow label="Onboarded" value={formatDate(gym.createdAt)} />
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-primary"><MapPin size={18} aria-hidden="true"/> Location &amp; Legal</h2>
              <div className="space-y-3 text-sm">
                <SuperadminGymDetailRow label="City" value={gym.city} />
                <SuperadminGymDetailRow label="State" value={gym.state} />
                <SuperadminGymDetailRow label="Country" value={gym.country} />
                <SuperadminGymDetailRow label="GSTIN" value={gym.gstin} emphasis={!gym.gstin} />
                {status === 'TRIAL' && gym.trialEndsAt ? <SuperadminGymDetailRow label="Trial Ends" value={formatDate(gym.trialEndsAt)} emphasisWarning /> : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'branches' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <Building2 size={18} className="mx-auto mb-4 text-disabled" aria-hidden="true"/>
            <h2 className="mb-2 text-xl font-bold text-primary">Branch &amp; Franchise Overview</h2>
            <p className="mx-auto max-w-md text-secondary">Branch and franchise management is handled exclusively by the Gym Admin portal. As Superadmin, you have read-only visibility into this tenant&apos;s physical locations.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: 'Total Branches', note: 'Synced from Admin portal', icon: Building2 },
              { label: 'Franchise Partners', note: 'Read-only for Superadmin', icon: Ticket },
              { label: 'Active Locations', note: 'Contact gym admin to modify', icon: MapPin },
            ].map(({ label, note, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                <div className="rounded-lg bg-primary-subtle p-3 text-primary"><Icon size={20} aria-hidden="true" /></div>
                <div><p className="text-xs uppercase tracking-wider text-secondary">{label}</p><p className="text-2xl font-bold text-primary">—</p><p className="mt-0.5 text-xs text-disabled">{note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'lifecycle' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6 rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary"><CreditCard size={18} aria-hidden="true"/> Current SaaS Plan</h2>
            <div className="relative overflow-hidden rounded-lg border border-border bg-floating p-5">
              <p className="text-sm text-secondary">Active Plan</p>
              <p className="text-3xl font-bold text-primary">{displayValue(gym.subscription.plan).toUpperCase()}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-success"><span className="inline-block h-2 w-2 rounded-full bg-success" aria-hidden="true" /> Active Subscription</p>
            </div>
            <Link href={SUPERADMIN_GYM_DETAIL_BILLING_ROUTE} className="block min-h-11 rounded-lg border border-border px-4 py-2.5 text-center font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Manage Billing &amp; Plans</Link>
          </div>
          <div className="space-y-6 rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary"><Ticket size={18} aria-hidden="true"/> Onboarding Status</h2>
            <ul className="space-y-4">
              {[
                ['Account Created', 'Complete', 'success'],
                ['Billing Configured', 'Complete', 'success'],
                ['First Branch Added', 'Pending', 'warning'],
              ].map(([label, value, tone]) => (
                <li key={label} className="flex items-center justify-between rounded-lg border border-border bg-floating p-3 text-sm">
                  <span className="font-medium text-primary">{label}</span>
                  <span className={`rounded px-2 py-1 text-xs font-semibold ${tone === 'success' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'whitelabel' && (
        <div className="space-y-6 rounded-xl border border-border bg-card p-8">
          <div className="flex items-start gap-3 border-b border-border pb-6">
            <div className="rounded-lg bg-primary-subtle p-3 text-primary"><Palette size={18} aria-hidden="true"/></div>
            <div>
              <h2 className="mb-2 text-xl font-bold text-primary">Brand Identity</h2>
              <p className="text-sm text-secondary">Branding controls are intentionally read-only on Gym Detail. The dedicated White-labeling feature owns domain and branding mutations.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-floating p-4"><p className="text-xs uppercase tracking-wider text-secondary">Gym</p><p className="mt-1 truncate font-semibold text-primary" title={gym.gymName}>{gym.gymName}</p></div>
            <div className="rounded-lg border border-border bg-floating p-4"><p className="text-xs uppercase tracking-wider text-secondary">Plan</p><p className="mt-1 font-semibold text-primary">{gym.plan}</p></div>
            <div className="rounded-lg border border-border bg-floating p-4"><p className="text-xs uppercase tracking-wider text-secondary">Status</p><p className="mt-1 font-semibold text-primary">{gym.status}</p></div>
          </div>
          <div className="rounded-lg border border-border bg-warning-bg p-4 text-sm text-warning">
            <div className="flex items-center gap-2"><LinkIcon size={18} aria-hidden="true"/><span>Use the dedicated White-labeling module for documented branding/domain management.</span></div>
          </div>
        </div>
      )}
    </section>
  );
}
