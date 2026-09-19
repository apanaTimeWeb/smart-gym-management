// RESPONSIBILITY: Renders the legacy Superadmin gym profile/detail surface from the feature-owned query hook. No API calls.
'use client';
import { ArrowLeft, Activity, Clock, CreditCard, MapPin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency, formatDate, displayValue } from '@/lib/formatters';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminGymDetail } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetail';
import type { SuperadminGymDetailClientProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailClientTypes';
import SuperadminGymDetailRow from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow';
import { getSuperadminGymStatusBadgeClasses } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsConstants';

export default function SuperadminGymDetailClient({ gymId }: SuperadminGymDetailClientProps) {
  const router = useRouter();
  const query = useSuperadminGymDetail(gymId);
  const gym = query.data?.data;

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
        <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-semibold ${getSuperadminGymStatusBadgeClasses(gym.status as any)}`}>
          {displayValue(gym.status)}
        </span>
      </div>

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
    </section>
  );
}

