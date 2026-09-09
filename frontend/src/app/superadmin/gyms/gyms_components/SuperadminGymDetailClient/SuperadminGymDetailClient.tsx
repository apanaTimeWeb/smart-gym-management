'use client';
// RESPONSIBILITY: Client component for /superadmin/gyms/[id] — full gym detail view.
// Shows subscription info, usage stats, location, GSTIN, trial expiry, and payment history.
// DATA FLOW: useQuery(['superadmin','gyms',gymId]) → SuperadminGymDetailClient → Tabs

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, User, CreditCard, Activity, MapPin, Shield, Clock } from 'lucide-react';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
import { MOCK_GYM_DETAIL } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsConstants';

interface SuperadminGymDetailClientProps {
  gymId: string;
}

export default function SuperadminGymDetailClient({ gymId }: SuperadminGymDetailClientProps) {
  const router = useRouter();

  const { data: res, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'gyms', gymId],
    queryFn: () => superadminApi.gyms.fetchGymById(gymId),
  });

  const gym: Tenant | undefined = res?.data || (process.env.NODE_ENV === 'development' ? MOCK_GYM_DETAIL : undefined);

  if (isLoading) {
    return (
      <div className="space-y-6 motion-safe:animate-pulse">
        <div className="h-8 w-48 bg-skeleton-base rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-skeleton-base rounded-xl border border-border" />)}
        </div>
        <div className="h-64 bg-skeleton-base rounded-xl border border-border" />
      </div>
    );
  }

  if (isError || !gym) {
    return (
      <div className="p-8 text-center">
        <p className="text-danger font-medium mb-4">Failed to load gym details.</p>
        <button onClick={() => router.back()} className="text-primary hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <button
        onClick={() => router.push('/superadmin/gyms')}
        className="flex items-center gap-2 text-secondary hover:text-foreground motion-safe:transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Back to Gyms
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{gym.name}</h1>
          <p className="text-secondary text-sm mt-1">Gym ID: {gym.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          gym.status === 'ACTIVE' ? 'bg-success/10 text-success border border-success/20' :
          gym.status === 'SUSPENDED' ? 'bg-danger-bg text-danger border border-destructive/20' :
          gym.status === 'TRIAL' ? 'bg-warning/10 text-warning border border-warning/20' :
          'bg-input text-secondary border border-border'
        }`}>{gym.status}</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg"><User size={20} className="text-primary" /></div>
          <div>
            <p className="text-xs text-secondary uppercase tracking-wider">Members</p>
            <p className="text-2xl font-bold text-foreground">{gym.memberCount}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-success/10 rounded-lg"><CreditCard size={20} className="text-success" /></div>
          <div>
            <p className="text-xs text-secondary uppercase tracking-wider">Monthly Revenue</p>
            <p className="text-2xl font-bold text-foreground">₹{gym.monthlyRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple/10 rounded-lg"><Activity size={20} className="text-purple" /></div>
          <div>
            <p className="text-xs text-secondary uppercase tracking-wider">Plan</p>
            <p className="text-2xl font-bold text-foreground">{gym.plan?.toUpperCase() || '—'}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-warning/10 rounded-lg"><Clock size={20} className="text-warning" /></div>
          <div>
            <p className="text-xs text-secondary uppercase tracking-wider">DB Version</p>
            <p className="text-lg font-bold text-foreground">{gym.databaseVersion || '—'}</p>
          </div>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <User size={16} className="text-primary" /> Owner & Contact
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-secondary">Owner</span><span className="text-foreground font-medium">{gym.ownerName}</span></div>
            <div className="flex justify-between"><span className="text-secondary">Email</span><span className="text-foreground font-medium">{gym.adminEmail}</span></div>
            <div className="flex justify-between"><span className="text-secondary">Phone</span><span className="text-foreground font-medium">{gym.phone}</span></div>
            <div className="flex justify-between"><span className="text-secondary">Onboarded</span><span className="text-foreground font-medium">{new Date(gym.createdAt).toLocaleDateString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-secondary">Last Login</span><span className="text-foreground font-medium">{gym.lastLoginAt ? new Date(gym.lastLoginAt).toLocaleDateString('en-IN') : '—'}</span></div>
          </div>
        </div>

        {/* Location & Legal */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <MapPin size={16} className="text-primary" /> Location & Legal
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-secondary">City</span><span className="text-foreground font-medium">{gym.city || '—'}</span></div>
            <div className="flex justify-between"><span className="text-secondary">State</span><span className="text-foreground font-medium">{gym.state || '—'}</span></div>
            <div className="flex justify-between"><span className="text-secondary">Country</span><span className="text-foreground font-medium">{gym.country || '—'}</span></div>
            <div className="flex justify-between"><span className="text-secondary">GSTIN</span>
              <span className={`font-mono font-medium ${gym.gstin ? 'text-foreground' : 'text-danger'}`}>
                {gym.gstin || '⚠ Not set'}
              </span>
            </div>
            {gym.status === 'TRIAL' && gym.trialEndsAt && (
              <div className="flex justify-between">
                <span className="text-secondary">Trial Ends</span>
                <span className="text-warning font-medium">{new Date(gym.trialEndsAt).toLocaleDateString('en-IN')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
